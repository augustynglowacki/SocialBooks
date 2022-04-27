import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlexStyle, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {palette} from 'src/styles';
import {AppButton, Avatar, Container} from '../common';
import {AppText} from '../common/AppText';
import {useDispatch, useSelector} from 'react-redux';
import {userSelector} from 'src/redux/user/userSlice';
import {setFollowing} from 'src/services/firestore';
import {collectionsSelector} from 'src/redux/collections/collectionsSlice';
import {Challenge} from 'src/models';
import {ChallengeComponent} from './ChallengeComponent';
import {ChalllengeActionButton} from './ChallengeActionButton';
import {
  completeChallenge,
  removeCompleteChallenge,
  removeTakePartInChallenge,
  takePartInChallenge,
} from 'src/redux/collections/collectionsActions';
import {ChallengeUsers} from './ChallengeUsers';

interface Props {
  style?: StyleProp<FlexStyle | ViewStyle>;
  shadowColor?: string;
  challengeData: Challenge;
  userCompleted: boolean;
  userTakingPart: boolean;
}

export const ChallengeDetails: React.FC<Props> = ({challengeData, userCompleted, userTakingPart}) => {
  const {
    colors: {background, text},
  } = useTheme();
  const dispatch = useDispatch();
  const {following} = useSelector(collectionsSelector);
  const {
    allUsers,
    user: {id},
  } = useSelector(userSelector);
  const challengeAuthorDisplayName =
    challengeData.createdBy &&
    ((id: string) => allUsers.find(item => item.userId === id)?.displayName)(challengeData.createdBy);

  const followingInitialState = following.some(item => item === challengeData.createdBy);
  const [followingButton, setFollowingButton] = useState(followingInitialState);
  const [userTakingPartState, setUserTakingPartState] = useState(userTakingPart);
  const [userCompletedState, setUserCompletedState] = useState(userCompleted);
  const [takingPartData, setTakingPartData] = useState(challengeData.takingPart ?? []);
  const [completedData, setCompletedData] = useState(challengeData.completed ?? []);
  const toggleFollowing = () =>
    !!challengeData.createdBy && setFollowing(challengeData.createdBy) && setFollowingButton(curr => !curr);

  const toggleIsTakingPart = () => {
    dispatch(!userTakingPartState ? takePartInChallenge(challengeData) : removeTakePartInChallenge(challengeData));
    setUserTakingPartState(curr => !curr);
    setTakingPartData(
      takingPartData.includes(id) ? [...takingPartData].filter(item => item !== id) : [...takingPartData, id],
    );
  };

  const toggleUserCompleted = () => {
    dispatch(!userCompletedState ? completeChallenge(challengeData) : removeCompleteChallenge(challengeData));
    setUserCompletedState(curr => !curr);
    setUserTakingPartState(false);
    setCompletedData(
      completedData.includes(id) ? [...completedData].filter(item => item !== id) : [...completedData, id],
    );
    setTakingPartData([...takingPartData].filter(item => item !== id));
  };

  const mainColor = (() => {
    if (userCompletedState) return palette.green;
    if (userTakingPartState) return palette.primary;
    return palette.secondary;
  })();

  return (
    <Container withNavigateBackBar>
      <AppText variant="h1" style={[styles.markedTitle, {color: mainColor}]}>
        Wyzwanie
      </AppText>
      <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        {!!challengeData.challengeTitle && <ChallengeComponent challengeData={challengeData} shadowColor={mainColor} />}
        {challengeData.createdBy && !!challengeAuthorDisplayName && (
          <View style={{flex: 1, width: '100%', paddingHorizontal: 4}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                width: '100%',
              }}>
              <AppText variant="p" style={styles.createdBy}>
                Autor wyzwania:
              </AppText>
              <View>
                <Avatar name={challengeAuthorDisplayName} size={36} color={palette.primary} />
              </View>
              <AppText fontWeight="bold" style={styles.author}>
                {challengeAuthorDisplayName}
              </AppText>
            </View>
            {challengeData.createdBy !== id && (
              <AppButton
                label={followingButton ? 'Przestań obserwować' : 'Obserwuj autora wyzwania'}
                onPress={toggleFollowing}
                style={styles.followButton}
                variant="secondary"
              />
            )}
            <ChallengeUsers completed={completedData} takingPart={takingPartData} />
            {!userCompletedState && (
              <ChalllengeActionButton
                label={userTakingPartState ? 'Zrezygnuj' : 'Weź udział'}
                onPress={toggleIsTakingPart}
                icon="ios-people"
                style={{marginVertical: 12}}
                state={userTakingPartState}
                activeColor={palette.primary}
              />
            )}
            {(!!userTakingPartState || !!userCompletedState) && (
              <ChalllengeActionButton
                label={userCompletedState ? 'Ukończone' : 'Ukończ'}
                onPress={toggleUserCompleted}
                icon="ios-checkbox"
                style={{marginVertical: 12}}
                state={userCompletedState}
                disabled={userCompletedState}
              />
            )}
            {!!challengeData.challengeDescription && (
              <AppText variant="p" style={styles.paragraph}>
                {challengeData.challengeDescription}
              </AppText>
            )}
          </View>
        )}

        {/* {!!reviewData.reviewDescription && (
          <AppText variant="p" style={styles.paragraph}>
            {reviewData.reviewDescription}
          </AppText>
        )} */}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  markedTitle: {
    paddingTop: 10,
    marginBottom: 30,
    color: palette.primary,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
    textShadowColor: 'rgba(0, 0, 0, 1)',
  },
  createdBy: {
    paddingTop: 30,
    paddingHorizontal: 3,
    marginRight: 8,
    lineHeight: 36,
  },
  author: {
    marginLeft: 6,
    paddingTop: 30,
    paddingHorizontal: 3,
    fontSize: 20,
    lineHeight: 36,
  },
  paragraph: {
    paddingTop: 30,
    paddingHorizontal: 3,
  },
  followButton: {
    marginTop: 20,
  },
});
