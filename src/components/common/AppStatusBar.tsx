import {useTheme} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme, View} from 'react-native';
import {palette} from 'src/styles';
interface Props {
  variant?: 'translucent' | 'full';
}

export const AppStatusBar: React.FC<Props> = ({variant = 'full'}) => {
  const {colors} = useTheme();
  const scheme = useColorScheme();
  if (variant === 'full') {
    return <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />;
  }
  return <StatusBar backgroundColor={colors.background} barStyle="dark-content" />;
};
