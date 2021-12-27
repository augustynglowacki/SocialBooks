import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from 'src/screens/HomeScreen';
import SearchScreen from 'src/screens/SearchScreen';
import {StyleProp, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Route} from 'src/constants';
import palette from 'src/styles/palette';
import TabIcon from './TabIcon';

const BOTTOM_TABS_HEIGHT = 60;
const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  const tabBarStyle: StyleProp<ViewStyle> = {
    backgroundColor: palette.black,
    borderTopWidth: 0,
    height: BOTTOM_TABS_HEIGHT + useSafeAreaInsets().bottom,
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle,
        headerShown: false,
      }}>
      <Tab.Screen
        name={Route.HOME}
        component={HomeScreen}
        options={{
          tabBarButton: ({onPress, accessibilityState}) => (
            <TabIcon onPress={onPress} focused={!!accessibilityState?.selected} name="ios-book" />
          ),
        }}
      />
      <Tab.Screen
        name={Route.SEARCH}
        component={SearchScreen}
        options={{
          tabBarButton: ({onPress, accessibilityState}) => (
            <TabIcon onPress={onPress} focused={!!accessibilityState?.selected} name="ios-search" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
