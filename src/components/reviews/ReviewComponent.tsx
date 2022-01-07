import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Dimensions, FlexStyle, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Book, Review} from 'src/models';
import {BORDER_RADIUS, BOX_SHADOW, palette} from 'src/styles';
import {BookComponent} from '../books';
import {Stats} from '../common';
import {AppText} from '../common/AppText';

interface Props {
  style?: StyleProp<FlexStyle | ViewStyle>;
  shadowColor?: string;
  paddingVal?: number;
  reviewData: Review;
}

export const ReviewComponent: React.FC<Props> = ({style, shadowColor = palette.primary, reviewData}) => {
  const {
    colors: {background, text},
  } = useTheme();

  const buttonStyle: StyleProp<ViewStyle> = {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: background,
    borderRadius: BORDER_RADIUS,
    minHeight: 180,
    height: 180,
    minWidth: '100%',
    width: '100%',
    maxWidth: 400,
    borderWidth: 4,
    borderColor: text,
  };
  const labelStyle: StyleProp<TextStyle> = {
    fontSize: 18,
    letterSpacing: 0.1,
    width: '100%',
    color: text,
    textAlign: 'center',
  };
  const wrapperStyle: StyleProp<ViewStyle> = {
    height: 180,
    width: Dimensions.get('window').width * 0.9,
    marginHorizontal: 14,
  };
  const shadowStyle: StyleProp<ViewStyle> = {
    position: 'absolute',
    alignSelf: 'center',
    left: -10,
    top: 15,
    backgroundColor: shadowColor,
    width: Dimensions.get('window').width * 0.9,
    maxWidth: Dimensions.get('window').width * 0.9,
    height: 175,
    borderRadius: BORDER_RADIUS,
  };
  const infoStyle: StyleProp<ViewStyle> = {
    marginHorizontal: 28,
    maxWidth: '40%',
    width: '40%',
    minWidth: '40%',
  };
  return (
    <View style={[wrapperStyle, BOX_SHADOW, style]}>
      <View style={shadowStyle}></View>
      <View style={buttonStyle}>
        <View style={{width: '40%'}}>
          {!!reviewData.book && (
            <BookComponent
              book={reviewData.book}
              style={{marginHorizontal: 24}}
              shadowColor={palette.primary}
              disabled
            />
          )}
        </View>
        <View style={[infoStyle]}>
          <AppText style={labelStyle} fontWeight="bold">
            {reviewData.reviewTitle}
          </AppText>
          <AppText style={[labelStyle]} fontWeight="bold">
            {reviewData.rating}
          </AppText>
        </View>
      </View>
    </View>
  );
};
