import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlexStyle, StyleProp, StyleSheet, useColorScheme, View, ViewStyle} from 'react-native';
import {Review} from 'src/models';
import {palette} from 'src/styles';
import {AppButton, Avatar, Container} from '../common';
import {AppText} from '../common/AppText';
import {ReviewComponent} from './ReviewComponent';
import {AnyScreenProp, Route} from 'src/constants';
import {useSelector} from 'react-redux';
import {userSelector} from 'src/redux/user/userSlice';
import {setFollowing} from 'src/services/firestore';
import {collectionsSelector} from 'src/redux/collections/collectionsSlice';

interface Props {
  style?: StyleProp<FlexStyle | ViewStyle>;
  shadowColor?: string;
  reviewData: Review;
}

export const ReviewDetails: React.FC<Props> = ({reviewData}) => {
  const {
    colors: {background, text},
  } = useTheme();
  const scheme = useColorScheme();
  const {navigate} = useNavigation<AnyScreenProp>();
  const {following, error} = useSelector(collectionsSelector);
  const {
    allUsers,
    user: {id},
  } = useSelector(userSelector);
  const followingInitialState = following.some(item => item === reviewData.createdBy);
  const [followingButton, setFollowingButton] = useState(followingInitialState);
  const getDisplayName = (id: string) => allUsers.find(item => item.userId === id)?.displayName;
  const toggleFollowing = () =>
    !!reviewData.createdBy && setFollowing(reviewData.createdBy) && setFollowingButton(curr => !curr);

  return (
    <Container withNavigateBackBar>
      <AppText variant="h1" style={styles.markedTitle}>
        Recenzja
      </AppText>
      <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <ReviewComponent
          reviewData={reviewData}
          onComponentPress={() => navigate(Route.DETAILS, {book: reviewData.book, id: reviewData.book.id})}
        />
        {reviewData.createdBy && !!getDisplayName(reviewData.createdBy) && (
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end', width: '100%'}}>
              <AppText variant="p" style={styles.createdBy}>
                Autor recenzji:
              </AppText>
              <View>
                <Avatar name={getDisplayName(reviewData.createdBy)} size={36} color={palette.primary} />
              </View>
              <AppText fontWeight="bold" style={styles.author}>
                {getDisplayName(reviewData.createdBy)}
              </AppText>
            </View>
            {reviewData.createdBy !== id && (
              <AppButton
                label={followingButton ? 'Przestań obserwować' : 'Obserwuj autora recenzji'}
                onPress={toggleFollowing}
                style={styles.followButton}
              />
            )}
          </View>
        )}

        {!!reviewData.reviewDescription && (
          <AppText variant="p" style={styles.paragraph}>
            {reviewData.reviewDescription}
          </AppText>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  markedTitle: {
    paddingTop: 10,
    marginBottom: 30,
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
    width: '100%',
  },
  followButton: {
    marginTop: 20,
  },
});
