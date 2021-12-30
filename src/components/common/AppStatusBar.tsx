import {useTheme} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme, View} from 'react-native';
import {palette} from 'src/styles';

export const AppStatusBar = () => {
  const {colors} = useTheme();
  const scheme = useColorScheme();
  return (
    <View style={{backgroundColor: colors.background}}>
      <SafeAreaView>
        <StatusBar
          backgroundColor={colors.background}
          barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        />
      </SafeAreaView>
    </View>
  );
};
