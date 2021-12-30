import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {palette} from 'src/styles';

export const AppStatusBar = () => (
  <View style={{backgroundColor: palette.white}}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={palette.white} barStyle={'dark-content'} />
    </SafeAreaView>
  </View>
);
