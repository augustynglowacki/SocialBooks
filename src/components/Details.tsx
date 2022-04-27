import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Book} from 'src/models';
import {palette} from 'src/styles';
import {BookComponent} from 'src/components/books';
import {AppButton, AppText, Container} from 'src/components/common';
import {convertDescription} from 'src/helpers/convertDescription';
import Animated, {useAnimatedStyle, useSharedValue, withDelay, withSpring} from 'react-native-reanimated';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {userSelector} from 'src/redux/user/userSlice';
import {setFavorite} from 'src/redux/collections/collectionsActions';
import {collectionsSelector} from 'src/redux/collections/collectionsSlice';
import {DetailsScreenProp, Route} from 'src/constants';
import {useNavigation} from '@react-navigation/native';

interface Props {
  book: Book | undefined;
}

export const Details: React.FC<Props> = ({book}) => {
  if (!book) return null;
  const {
    user: {userName, id},
  } = useSelector(userSelector);
  const dispatch = useDispatch();

  const {volumeInfo} = book;

  const {favorite} = useSelector(collectionsSelector);
  const favoriteInitialState: boolean = favorite
    .filter(item => item.createdBy === id)
    .some(item => item.book.id === book.id);
  const [favoriteButton, setFavoriteButton] = useState(favoriteInitialState);

  const handleAddtoCollection = () => {
    if (!!userName) {
      setFavoriteButton(prev => !prev);
      dispatch(setFavorite(book));
    }
  };

  const scale = useSharedValue(0);
  const doubleTapRef = useRef();
  const rStyle = useAnimatedStyle(() => ({
    transform: [{scale: Math.max(scale.value, 0)}],
  }));

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, isFinished => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
    handleAddtoCollection();
  }, []);

  const {navigate} = useNavigation<DetailsScreenProp>();

  return (
    <Container
      style={styles.wrapper}
      withNavigateBackBar
      rightIcon
      buttonState={favoriteButton}
      toggleButtonState={handleAddtoCollection}>
      <TapGestureHandler maxDelayMs={500} ref={doubleTapRef} numberOfTaps={2} onActivated={onDoubleTap}>
        <View>
          <BookComponent book={book} style={{marginVertical: 24}} shadowColor={palette.secondary} variant="details" />
          <Animated.Image
            source={require('src/assets/images/heart.png')}
            style={[styles.heart, rStyle]}
            resizeMode={'center'}
          />
        </View>
      </TapGestureHandler>

      {!!volumeInfo.title && (
        <AppText style={styles.title} fontWeight="bold">
          {volumeInfo.title}
        </AppText>
      )}
      <View style={styles.authorWrapper}>
        {!!volumeInfo.authors &&
          volumeInfo.authors.slice(0, 2).map(item => (
            <AppText key={item} variant="subtitle" style={styles.author}>
              {item}
            </AppText>
          ))}
      </View>
      <AppButton
        label="Zrecenzuj książkę!"
        style={{marginVertical: 24}}
        variant="secondary"
        onPress={() => navigate(Route.ADD_REVIEW_SCREEN, {book: book, id: book.id})}
      />
      {!!volumeInfo.description && (
        <AppText variant="p" style={styles.paragraph}>
          {convertDescription(volumeInfo.description)}
        </AppText>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    maxWidth: '100%',
  },
  authorWrapper: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 4,
  },
  title: {
    paddingTop: 30,
    fontSize: 24,
    letterSpacing: -0.8,
    textAlign: 'center',
  },
  author: {
    paddingTop: 20,
    marginHorizontal: 12,
  },
  heart: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 65, //cover width/2 - heart width/2
    top: 135,
    zIndex: 10000,
    shadowOffset: {width: 18, height: 18},
    shadowOpacity: 1,
    shadowRadius: 145,
  },
  paragraph: {
    paddingTop: 20,
    paddingHorizontal: 3,
  },
});
