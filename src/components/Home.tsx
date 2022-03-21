import React from 'react';
import {StyleSheet, View} from 'react-native';
import {palette} from 'src/styles';
import {AppText, Container} from 'src/components/common';
import {useSelector} from 'react-redux';
import {userSelector} from 'src/redux/user/userSlice';
import {collectionsSelector} from 'src/redux/collections/collectionsSlice';
import {ReviewList} from './reviews';
import Animated, {FadeIn} from 'react-native-reanimated';
interface Props {}

export const Home: React.FC<Props> = () => {
  const {
    user: {userName},
  } = useSelector(userSelector);
  const {reviews, error, loading} = useSelector(collectionsSelector);
  
  return (
    <Container style={styles.container} disableScroll>
      {!!userName && (
        <Animated.View entering={FadeIn.springify().stiffness(15)}>
          <AppText style={styles.title} variant="h1">
            Witaj{' '}
            <AppText variant="h1" style={styles.markedTitle} fontWeight="bold">
              {userName}
            </AppText>
          </AppText>
        </Animated.View>
      )}
      {!!reviews && (
        <Animated.View entering={FadeIn.springify().stiffness(15)} style={{width: '100%', flex: 1}}>
          <AppText style={styles.collectionTitle} fontWeight="bold">
            Najnowsze recenzje:
          </AppText>
          {!!reviews ? (
            <ReviewList data={reviews} error={error} loading={loading} />
          ) : (
            <AppText style={{paddingTop: 12}}>Błąd w ładowaniu recenzji:/</AppText>
          )}
        </Animated.View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingTop: 10,
  },
  container: {
    paddingTop: 10,
    justifyContent: 'flex-start',
    flex: 1,
  },
  collectionTitle: {
    marginTop: 20,
    marginBottom: 26,
    fontSize: 24,
    textAlign: 'center',
  },
  markedTitle: {
    color: palette.primary,
  },
});
