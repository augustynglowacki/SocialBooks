import {useTheme} from '@react-navigation/native';
import React from 'react';
import {FlexStyle, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import {BORDER_RADIUS, BOX_SHADOW, palette} from 'src/styles';
import {AppText} from './AppText';

interface Props {
  disabled?: boolean;
  label: string;
  onPress?: () => void;
  style?: StyleProp<FlexStyle | ViewStyle>;
  shadowColor?: string;
  shadowMaxWidth: number;
}

export const FeatureButton: React.FC<Props> = ({
  disabled,
  label,
  onPress,
  style,
  shadowColor = palette.primary,
  shadowMaxWidth = 225,
}) => {
  const {
    colors: {background, text},
  } = useTheme();

  const buttonStyle: StyleProp<ViewStyle> = {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: background,
    borderRadius: BORDER_RADIUS,
    height: 80,
    maxWidth: 250,
    borderWidth: 4,
    borderColor: text,
  };
  const labelStyle: StyleProp<TextStyle> = {
    fontSize: 18,
    letterSpacing: 0.1,
    paddingHorizontal: 40,
    color: text,
  };
  const wrapperStyle: StyleProp<ViewStyle> = {
    height: 80,
    maxWidth: 250,
  };
  const shadowStyle: StyleProp<ViewStyle> = {
    position: 'absolute',
    left: 13,
    top: 13,
    backgroundColor: shadowColor,
    width: '100%',
    maxWidth: shadowMaxWidth, //need to specify it manually every time because the width on the white box is auto (text+padding)
    height: 75,
    borderRadius: BORDER_RADIUS,
  };
  if (disabled) {
    return (
      <View style={[wrapperStyle, BOX_SHADOW, style]}>
        <View style={shadowStyle}></View>
        <View style={buttonStyle}>
          <AppText style={labelStyle} fontWeight="bold">
            {label}
          </AppText>
        </View>
      </View>
    );
  }
  return (
    <View style={[wrapperStyle, BOX_SHADOW, style]}>
      <TouchableOpacity onPress={onPress}>
        <View style={shadowStyle}></View>
        <View style={buttonStyle}>
          <AppText style={labelStyle} fontWeight="bold">
            {label}
          </AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
};
