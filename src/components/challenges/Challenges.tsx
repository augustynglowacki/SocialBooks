import React, {useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {palette} from 'src/styles';
import {AppButton, AppText, Container} from 'src/components/common';
import {useDispatch, useSelector} from 'react-redux';
import {collectionsSelector} from 'src/redux/collections/collectionsSlice';
import Animated, {FadeIn} from 'react-native-reanimated';
import {ChallengesScreenProp, Route} from 'src/constants';
import {useNavigation} from '@react-navigation/native';
import {ChallengesList} from './ChallengesList';
import {getChallenges} from 'src/redux/collections/collectionsActions';
import {useStateContext} from 'src/context/stateContext';

export const Challenges: React.FC = () => {
  const {following, error, loading, challenges} = useSelector(collectionsSelector);
  const {navigate} = useNavigation<ChallengesScreenProp>();
  const {hasSomethingBeenAdded} = useStateContext();
  const isUserFollowed = (id: string) => following.some(item => item === id);
  // const communityChallenges = (() => challenges.filter(item => !!item.createdBy && isUserFollowed(item.createdBy)))();
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(getChallenges());
    }, 100);
  }, [hasSomethingBeenAdded]);

  return (
    <Container style={styles.container} disableScroll>
      <Animated.View entering={FadeIn.springify().stiffness(15)} style={{width: '100%', flex: 1}}>
        <AppText variant="h1" style={styles.markedTitle}>
          Wyzwania
        </AppText>
        <AppButton label={'Dodaj wyzwanie'} onPress={() => navigate(Route.ADD_CHALLENGE)} style={styles.followButton} />
        {!!challenges.length ? (
          <ChallengesList data={challenges} error={error} loading={loading} />
        ) : (
          <>
            <AppText style={{paddingTop: 12}}>Dodaj pierwsze wyzwanie!</AppText>
          </>
        )}
      </Animated.View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    justifyContent: 'flex-start',
    flex: 1,
  },
  markedTitle: {
    color: palette.secondary,
    textShadowOffset: {width: 1, height: 2},
    textShadowRadius: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    paddingBottom: 35,
  },
  followButton: {
    marginTop: 20,
    marginBottom: 28,
  },
});
