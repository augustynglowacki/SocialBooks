import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamList, Route} from 'src/constants';
import LoginScreen from 'src/screens/LoginScreen';
// import RegisterScreen from 'src/screens/RegisterScreen';
import {screenOptions} from './HomeNavigator';

const AuthNavigator = () => {
  const AuthStack = createStackNavigator<RootStackParamList>();

  return (
    <AuthStack.Navigator screenOptions={screenOptions}>
      <AuthStack.Screen name={Route.LOGIN} component={LoginScreen} />
      {/* <AuthStack.Screen name={Route.REGISTER} component={RegisterScreen} /> */}
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
