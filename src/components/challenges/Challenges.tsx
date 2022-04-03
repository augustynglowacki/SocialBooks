import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {palette} from 'src/styles';
import {AppButton, AppText, Container} from 'src/components/common';
import {useDispatch, useSelector} from 'react-redux';
import {collectionsSelector} from 'src/redux/collections/collectionsSlice';
import Animated, {FadeIn} from 'react-native-reanimated';
import {ChallengesScreenProp, Route} from 'src/constants';
import {useNavigation, useTheme} from '@react-navigation/native';
import {ChallengesList} from './ChallengesList';
import {getChallenges} from 'src/redux/collections/collectionsActions';
import {useStateContext} from 'src/context/stateContext';
import {AppModal} from '../common/AppModal';
import {Picker} from '@react-native-picker/picker';
import {userSelector} from 'src/redux/user/userSlice';
import {Challenge} from 'src/models';

export enum ChallengesFilters {
  ALL = 'Wszystkie',
  NOT_STARTED = 'Nierozpoczęte',
  TAKING_PART = 'W trakcie',
  COMPLETED = 'Ukończone',
}

export const Challenges: React.FC = () => {
  const {error, loading, challenges} = useSelector(collectionsSelector);
  const {
    allUsers,
    user: {id},
  } = useSelector(userSelector);
  const {
    colors: {text},
  } = useTheme();

  const {navigate} = useNavigation<ChallengesScreenProp>();
  const {hasSomethingBeenAdded} = useStateContext();
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(getChallenges());
    }, 200);
  }, [hasSomethingBeenAdded]);

  const [selectedChallenges, setSelectedChallenges] = useState<ChallengesFilters>(ChallengesFilters.ALL);

  const sortedChallenges = (item: Challenge[]) =>
    [...item].sort((a, b) => {
      if (a.challengeDeadline.localeCompare(b.challengeDeadline) === 1) return -1;
      if (a.challengeDeadline.localeCompare(b.challengeDeadline) === -1) return 1;
      return 0;
    });

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(curr => !curr);
  };

  const userTakingPart = challenges.filter(item => item.takingPart?.includes(id));
  const userCompleted = challenges.filter(item => item.completed?.includes(id));

  const getFilteredChallenges = (): Challenge[] => {
    if (selectedChallenges === ChallengesFilters.TAKING_PART) {
      return sortedChallenges(userTakingPart);
    }
    if (selectedChallenges === ChallengesFilters.COMPLETED) {
      return sortedChallenges(userCompleted);
    }
    if (selectedChallenges === ChallengesFilters.NOT_STARTED) {
      return sortedChallenges(
        challenges.filter(item => !item.takingPart?.includes(id) && !item.completed?.includes(id)),
      );
    }
    return sortedChallenges(challenges);
  };

  return (
    <Container style={styles.container} disableScroll>
      <Animated.View entering={FadeIn.springify().stiffness(15)} style={{width: '100%', flex: 1}}>
        <AppText variant="h1" style={styles.markedTitle}>
          Wyzwania
        </AppText>
        <AppButton label={'Dodaj wyzwanie'} onPress={() => navigate(Route.ADD_CHALLENGE)} style={styles.followButton} />
        {!!challenges.length ? (
          <ChallengesList data={getFilteredChallenges()} error={error} loading={loading} />
        ) : (
          <>
            <AppText style={{paddingTop: 12}}>Dodaj pierwsze wyzwanie!</AppText>
          </>
        )}
      </Animated.View>
      <AppModal modalVisible={modalVisible} toggleModal={toggleModal}>
        <Picker selectedValue={selectedChallenges} onValueChange={item => setSelectedChallenges(item)}>
          {Object.values(ChallengesFilters).map(item => (
            <Picker.Item key={item} label={item} value={item} color={text} />
          ))}
        </Picker>
      </AppModal>
      <AppButton label={'Filtruj wyzwania'} onPress={toggleModal} style={styles.filterButton} />
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
    paddingBottom: 15,
  },
  followButton: {
    marginTop: 20,
    marginBottom: 28,
    paddingBottom: 25,
  },
  filterButton: {
    marginBottom: 10,
  },
});
