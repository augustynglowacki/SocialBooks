import {useTheme} from '@react-navigation/native';
import React from 'react';
import {FlexStyle, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import {BORDER_RADIUS, BOX_SHADOW, palette} from 'src/styles';
import {AppText, Icon} from '../common';

interface Props {
  disabled?: boolean;
  label: string;
  onPress?: () => void;
  style?: StyleProp<FlexStyle | ViewStyle>;
  shadowColor?: string;
  shadowMaxWidth: number;
  icon: string;
  state: boolean;
  activeColor?: string;
}

export const ChalllengeActionButton: React.FC<Props> = ({
  disabled,
  label,
  onPress,
  icon,
  style,
  activeColor = palette.green,
  state = false,
}) => {
  const {
    colors: {background, text},
  } = useTheme();

  const buttonStyle: StyleProp<ViewStyle> = {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
    paddingHorizontal: 20,
    color: text,
  };
  const wrapperStyle: StyleProp<ViewStyle> = {
    height: 80,
    maxWidth: 250,
  };
  const iconStyle: StyleProp<ViewStyle> = {paddingRight: 20};
  if (disabled) {
    return (
      <View style={[wrapperStyle, BOX_SHADOW, style]}>
        <View style={buttonStyle}>
          <AppText style={labelStyle} fontWeight="bold">
            {label}
          </AppText>
          <Icon
            name={state ? icon : icon + '-outline'}
            size={40}
            style={[iconStyle, state ? {color: activeColor} : {color: 'black'}]}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={[wrapperStyle, BOX_SHADOW, style]}>
      <TouchableOpacity onPress={onPress}>
        <View style={buttonStyle}>
          <AppText style={labelStyle} fontWeight="bold">
            {label}
          </AppText>
          <Icon
            name={state ? icon : icon + '-outline'}
            size={40}
            style={[iconStyle, state ? {color: activeColor} : {color: 'black'}]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
