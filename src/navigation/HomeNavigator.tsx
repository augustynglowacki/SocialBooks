import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import React from 'react';
import {Platform} from 'react-native';
import {RootStackParamList, Route} from 'src/constants';
import {
  AddReviewScreen,
  DetailsScreen,
  LoginScreen,
  RegisterScreen,
  ReviewDetailsScreen,
  WelcomeScreen,
} from 'src/screens';
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
      <Stack.Screen name={Route.WELCOME} component={WelcomeScreen} options={{gestureEnabled: false}} />
      <Stack.Screen name={Route.LOGIN} component={LoginScreen} />
      <Stack.Screen name={Route.REGISTER} component={RegisterScreen} />
      <Stack.Screen name={Route.HOME_NAVIGATOR} component={BottomTabsNavigator} options={{gestureEnabled: false}} />
      <Stack.Screen name={Route.DETAILS} component={DetailsScreen} />
      <Stack.Screen name={Route.ADD_REVIEW_SCREEN} component={AddReviewScreen} />
      <Stack.Screen name={Route.REVIEW_DETAILS} component={ReviewDetailsScreen} />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
