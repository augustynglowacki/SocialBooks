import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleProp, Text, TextStyle, useColorScheme, ViewStyle} from 'react-native';
import {palette} from 'src/styles';

type FontWeight = 'light' | 'regular' | 'bold';
type Variant = 'h1' | 'p' | 'subtitle';
interface Props {
  style?: StyleProp<TextStyle | ViewStyle>;
  variant?: Variant;
  fontWeight?: FontWeight;
}

export const AppText: React.FC<Props> = ({children, style, variant, fontWeight = 'regular'}) => {
  const {colors} = useTheme();
  const scheme = useColorScheme();
  const baseStyle: StyleProp<TextStyle> = {
    fontFamily: `RobotoMono-${fontWeight.charAt(0).toUpperCase() + fontWeight.slice(1)}`,
    color: colors.text,
  };

  const getVariant = (): StyleProp<TextStyle> => {
    if (variant === 'h1') return {fontSize: 32, letterSpacing: -0.5, textAlign: 'center'};
    if (variant === 'subtitle') return {fontSize: 17, letterSpacing: -0.8, opacity: scheme === 'dark' ? 0.95 : 0.8};
    if (variant === 'p')
      return {
        fontSize: 16,
        letterSpacing: -0.8,
        opacity: scheme === 'dark' ? 0.9 : 0.75,
      };
    return {
      fontSize: 16,
    };
  };

  return <Text style={[baseStyle, getVariant(), style]}>{children}</Text>;
};
