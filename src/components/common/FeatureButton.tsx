import React from 'react';
import {FlexStyle, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import {BORDER_RADIUS, palette} from 'src/styles';
import {AppText} from './AppText';

interface Props {
  disabled?: boolean;
  label: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  onPress: () => void;
  style?: StyleProp<FlexStyle | ViewStyle>;
  shadowColor?: string;
  shadowMaxWidth: number;
}

export const FeatureButton: React.FC<Props> = ({
  disabled,
  loading,
  label,
  variant = 'primary',
  onPress,
  style,
  shadowColor = palette.primary,
  shadowMaxWidth = 225,
}) => {
  const {black, white} = palette;

  const buttonStyle: StyleProp<ViewStyle> = {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: white,
    borderRadius: BORDER_RADIUS,
    height: 80,
    maxWidth: 250,
    borderWidth: 4,
    borderColor: black,
  };
  const labelStyle: StyleProp<TextStyle> = {
    fontSize: 18,
    letterSpacing: 0.1,
    paddingHorizontal: 40,
    color: black,
  };
  const wrapperStyle: StyleProp<ViewStyle> = {height: 80, maxWidth: 250};
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

  return (
    <View style={[wrapperStyle, style]}>
      <TouchableOpacity disabled={disabled} onPress={onPress}>
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
