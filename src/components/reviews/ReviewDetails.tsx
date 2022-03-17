import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  FlexStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import {Book, Review} from 'src/models';
import {BORDER_RADIUS, BOX_SHADOW, palette} from 'src/styles';
import {BookComponent} from '../books';
import {Avatar, Container, Stats} from '../common';
import {AppText} from '../common/AppText';
import Stars from 'react-native-stars';
import {ReviewComponent} from './ReviewComponent';
import {AnyScreenProp, Route} from 'src/constants';
import {useSelector} from 'react-redux';
import {userSelector} from 'src/redux/user/userSlice';

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
  const {allUsers} = useSelector(userSelector);
  const getDisplayName = (id: string) => allUsers.find(item => item.userId === id)?.displayName;
  return (
    <Container withNavigateBackBar>
      <AppText variant="h1" style={styles.markedTitle}>
        Review
      </AppText>
      <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <ReviewComponent
          reviewData={reviewData}
          onComponentPress={() => navigate(Route.DETAILS, {book: reviewData.book, id: reviewData.book.id})}
        />
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end', width: '100%'}}>
          {!!reviewData.createdBy && (
            <>
              <AppText variant="p" style={styles.createdBy}>
                Autor recenzji:
              </AppText>
              <View style={{marginRight: 2}}>
                <Avatar name={getDisplayName(reviewData.createdBy)} size={40} color={palette.primary} />
              </View>
              <AppText fontWeight="bold" style={styles.author}>
                {getDisplayName(reviewData.createdBy)}
              </AppText>
            </>
          )}
        </View>

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
    color: palette.primary,
    textShadowOffset: {width: 1, height: 2},
    textShadowRadius: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
  },
  createdBy: {
    paddingTop: 30,
    paddingHorizontal: 3,
    marginRight: 8,
    lineHeight: 40,
  },
  author: {
    paddingTop: 30,
    paddingHorizontal: 3,
    fontSize: 20,
    lineHeight: 40,
  },
  paragraph: {
    paddingTop: 30,
    paddingHorizontal: 3,
    width: '100%',
  },
});
