import {useNavigation, useTheme} from '@react-navigation/native';
import React, {FC} from 'react';
import {
  Dimensions,
  FlexStyle,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Avatar, AppText, InfoBox, Stats, Container, FeatureButton, Icon} from 'src/components/common';
import {palette} from 'src/styles';
import {useDispatch, useSelector} from 'react-redux';
import {BookList} from './books';
import {collectionsSelector} from 'src/redux/collections/collectionsSlice';
import {ReviewList} from './reviews';
import {logOutUser} from 'src/redux/user/userActions';
import {AnyScreenProp, Route} from 'src/constants';

interface Props {
  name: string;
  id: string;
}

export const Profile: FC<Props> = ({name, id}) => {
  const {colors} = useTheme();
  const {favorite, reviews, error, loading} = useSelector(collectionsSelector);
  const dispatch = useDispatch();
  const {navigate} = useNavigation<AnyScreenProp>();
  const userReviews = reviews.filter(item => item.createdBy === id);
  const gradientStyle: StyleProp<ViewStyle | FlexStyle> = {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  };
  const stats: Stats[] = [
    {label: 'Ulubione', count: favorite.length},
    {label: 'Recenzje', count: userReviews.length},
  ];

  // giving background color to SafeAreaView is the only way to have the blue color, giving the gradient
  // "endless" feeling at the top when "pulling/scrolling" down the screen. Other way would be to set it
  // as "background" color in App.tsx themes, but only for route.profile
  return (
    <Container style={styles.wrapper} safeAreaEdges={['left', 'right']} padding="none">
      <View style={styles.gradient}>
        <LinearGradient
          colors={[palette.secondary, palette.primary, palette.third, colors.background]}
          style={gradientStyle}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <SafeAreaView style={{width: '100%'}}>
            <View style={styles.logoutBar}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(logOutUser());
                  navigate(Route.WELCOME);
                }}>
                <Icon color={'black'} name={'log-out-outline'} size={38} />
              </TouchableOpacity>
            </View>
            <View style={styles.info}>
              <Avatar name={name} />
              <AppText style={styles.title} variant="h1">
                {name}
              </AppText>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>
      <InfoBox stats={stats} shadowColor={palette.third} style={styles.infoBox} />
      <View style={styles.collections}>
        <View>
          <AppText style={styles.collectionTitle} fontWeight="bold">
            Twoje ulubione:
          </AppText>
          {!!favorite.length ? (
            <BookList data={favorite} error={error} loading={loading} />
          ) : (
            <AppText style={{paddingTop: 12}}>
              Dodaj ksiązki do ulubionych! {'\n'}1.Wyszukaj ksiązkę.{'\n'}2.Kliknij na jej okładkę, by przejść na ekran
              szczegółów.{'\n'}3.Polub ksiązkę wykonując podwójne kliknięcie na jej okładce!
            </AppText>
          )}
        </View>
        <View>
          <AppText style={styles.collectionTitle} fontWeight="bold">
            Twoje recenzje:
          </AppText>
          {!!userReviews.length ? (
            <ReviewList data={userReviews} error={error} loading={loading} horizontal={true} />
          ) : (
            <AppText style={{paddingTop: 12}}>Oceń pierwszą książkę!</AppText>
          )}
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    // backgroundColor: palette.secondary, //drag down effect
  },
  logoutBar: {
    position: 'absolute',
    top: 0,
    marginTop: -30,
    right: 15,
  },
  gradient: {
    minHeight: 270,
    height: Dimensions.get('window').height * 0.4,
    maxHeight: 300,
    flex: 1,
  },
  collectionTitle: {
    marginTop: 24,
    fontSize: 24,
  },
  info: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  collections: {
    alignSelf: 'center',
    width: '90%',
    maxWidth: '90%',
  },
  infoBox: {
    alignSelf: 'center',
    transform: [{translateY: -Dimensions.get('window').height * 0.03}],
  },
  title: {
    color: palette.black,
    marginLeft: 24,
  },
});
