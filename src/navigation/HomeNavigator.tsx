import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamList, Route} from 'src/constants';
import BottomTabsNavigator from './BottomTabs/BottomTabsNavigator';

const Stack = createStackNavigator<RootStackParamList>();

function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureResponseDistance: 200,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name={Route.HOME_NAVIGATOR} component={BottomTabsNavigator} />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
