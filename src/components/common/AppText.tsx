import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleProp, Text, TextStyle, ViewStyle} from 'react-native';
import {palette} from 'src/styles';

type FontWeight = 'light' | 'regular' | 'bold';
type Variant = 'h1' | 'p';
interface Props {
  style?: StyleProp<TextStyle | ViewStyle>;
  variant?: Variant;
  fontWeight?: FontWeight;
}

export const AppText: React.FC<Props> = ({children, style, variant, fontWeight = 'regular'}) => {
  const {colors} = useTheme();
  const baseStyle: StyleProp<TextStyle> = {
    fontFamily: `RobotoMono-${fontWeight.charAt(0).toUpperCase() + fontWeight.slice(1)}`,
    color: colors.text,
  };

  const getVariant = (): StyleProp<TextStyle> => {
    if (variant === 'h1') return {fontSize: 32, letterSpacing: -0.5, textAlign: 'center'};
    return {fontSize: 17, letterSpacing: -0.5};
  };

  return <Text style={[baseStyle, getVariant(), style]}>{children}</Text>;
};
