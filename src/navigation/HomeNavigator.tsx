import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import React from 'react';
import {Platform} from 'react-native';
import {RootStackParamList, Route} from 'src/constants';
import {DetailsScreen, LoginScreen, RegisterScreen} from 'src/screens';
import BottomTabsNavigator from './BottomTabs/BottomTabsNavigator';

const Stack = createStackNavigator<RootStackParamList>();
export const screenOptions = {
  headerShown: false,
  gestureEnabled: Platform.OS === 'ios',
  gestureResponseDistance: 200,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={Route.HOME_NAVIGATOR} component={BottomTabsNavigator} />
      <Stack.Screen
        name={Route.DETAILS}
        component={DetailsScreen}
        // sharedElements={route => {
        //   return [route.params.id];
        // }}
      />
      <Stack.Screen name={Route.LOGIN} component={LoginScreen} />
      <Stack.Screen name={Route.REGISTER} component={RegisterScreen} />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
