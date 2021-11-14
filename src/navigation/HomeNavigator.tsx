import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamList, Route, SCREEN_OPTIONS} from 'src/constants';
import BottomTabsNavigator from './BottomTabs/BottomTabsNavigator';

const Stack = createStackNavigator<RootStackParamList>();

function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={SCREEN_OPTIONS}>
      <Stack.Screen
        name={Route.HOME_NAVIGATOR}
        component={BottomTabsNavigator}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
