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
import {Container, Stats} from '../common';
import {AppText} from '../common/AppText';
import Stars from 'react-native-stars';
import {ReviewComponent} from './ReviewComponent';
import {AnyScreenProp, Route} from 'src/constants';

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
  paragraph: {
    paddingTop: 50,
    paddingHorizontal: 3,
  },
});
