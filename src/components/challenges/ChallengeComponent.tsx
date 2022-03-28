import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  FlexStyle,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import {Challenge} from 'src/models';
import {BORDER_RADIUS, BOX_SHADOW, palette} from 'src/styles';
import {BookComponent} from '../books';
import {AppText} from '../common/AppText';

interface Props {
  style?: StyleProp<FlexStyle | ViewStyle>;
  shadowColor?: string;
  paddingVal?: number;
  challengeData: Challenge;
  onComponentPress?: () => void;
  userTakingPart?: boolean;
  userCompleted?: boolean;
}

export const ChallengeComponent: React.FC<Props> = ({
  style,
  shadowColor = palette.primary,
  challengeData,
  onComponentPress,
  userTakingPart,
  userCompleted,
}) => {
  const {
    colors: {background, text},
  } = useTheme();
  const scheme = useColorScheme();
  const buttonStyle: StyleProp<ViewStyle> = {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: background,
    borderRadius: BORDER_RADIUS,
    minHeight: 110,
    height: 110,
    minWidth: '100%',
    width: '100%',
    maxWidth: 400,
    borderWidth: 4,
    borderColor: text,
  };
  const labelStyle: StyleProp<TextStyle> = {
    fontSize: 15,
    letterSpacing: 0.1,
    lineHeight: 18,
    color: text,
    textAlign: 'center',
  };
  const wrapperStyle: StyleProp<ViewStyle> = {
    height: 110,
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
    height: 104,
    borderRadius: BORDER_RADIUS,
  };
  const infoStyle: StyleProp<ViewStyle> = {
    paddingHorizontal: 22,
    marginVertical: 22,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  };
  return (
    <TouchableOpacity onPress={onComponentPress}>
      <View style={[wrapperStyle, BOX_SHADOW, style]}>
        <View
          style={[
            shadowStyle,
            userTakingPart && {backgroundColor: palette.primary},
            userCompleted && {backgroundColor:palette.green},
          ]}></View>
        <View style={buttonStyle}>
          {/* <View style={{width: '40%'}}>
            {!!reviewData.book && (
              <BookComponent
                book={reviewData.book}
                style={{marginHorizontal: 24, transform: [{translateY: -2}]}}
                shadowColor={palette.primary}
              />
            )}
          </View> */}
          <View style={infoStyle}>
            <AppText style={labelStyle} fontWeight="bold">
              {challengeData.challengeTitle}
            </AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
