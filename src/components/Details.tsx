import React, {useCallback, useRef} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';
import {Book} from 'src/models';
import {palette} from 'src/styles';
import {BookComponent} from 'src/components/books';
import {AppText, Container} from 'src/components/common';
import {convertDescription} from 'src/helpers/convertDescription';
import Animated, {useAnimatedStyle, useSharedValue, withDelay, withSpring} from 'react-native-reanimated';
import {TapGestureHandler} from 'react-native-gesture-handler';

interface Props {
  book: Book | undefined;
  goBack: () => void;
}

export const Details: React.FC<Props> = ({book, goBack}) => {
  if (!book) return null;
  const {volumeInfo} = book;
  //heart animation, touch logic
  const scale = useSharedValue(0);
  const doubleTapRef = useRef();
  const rStyle = useAnimatedStyle(() => ({
    transform: [{scale: Math.max(scale.value, 0)}],
  }));
  const onDoubleTap = useCallback(() => {
    console.log('click');
    scale.value = withSpring(1, undefined, isFinished => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  }, []);
  return (
    <Container style={styles.wrapper} flexStart>
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

      {volumeInfo.title && (
        <AppText style={styles.title} fontWeight="bold">
          {volumeInfo.title}
        </AppText>
      )}
      <View style={styles.authorWrapper}>
        {volumeInfo.authors &&
          volumeInfo.authors.slice(0, 2).map(item => (
            <AppText key={item} variant="subtitle" style={styles.author}>
              {item}
            </AppText>
          ))}
      </View>
      {volumeInfo.description && (
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
  },
  authorWrapper: {
    flexDirection: 'row',
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
    paddingTop: 50,
    paddingHorizontal: 3,
  },
});
