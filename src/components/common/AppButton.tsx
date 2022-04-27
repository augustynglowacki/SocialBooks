import {useTheme} from '@react-navigation/native';
import React from 'react';
import {FlexStyle, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {palette} from 'src/styles';
import {BORDER_RADIUS, BOX_SHADOW} from 'src/styles/common';
import {AppText} from './AppText';

interface Props {
  disabled?: boolean;
  label: string;
  variant?: 'primary' | 'secondary';
  onPress: () => void;
  style?: StyleProp<FlexStyle | ViewStyle>;
}

export const AppButton: React.FC<Props> = ({disabled, label, variant = 'primary', onPress, style}) => {
  const isPrimary = variant === 'primary';
  const {
    colors: {background, text},
  } = useTheme();
  const {primary, secondary, third} = palette;

  const buttonStyle: StyleProp<ViewStyle> = {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: isPrimary ? secondary : text,
    borderRadius: BORDER_RADIUS,
    height: 60,
    minWidth: '100%',
    width: '100%',
    maxWidth: 400,
  };
  const labelStyle: StyleProp<TextStyle> = {
    fontSize: 18,
    letterSpacing: 0.1,
    color: isPrimary ? palette.black : background,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
  };

  return (
    <View style={[BOX_SHADOW, style]}>
      <TouchableOpacity disabled={disabled} onPress={onPress} style={buttonStyle}>
        <AppText style={labelStyle} fontWeight="bold">
          {label}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};
