import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleProp, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Route} from 'src/constants';
import {TabIcon} from './TabIcon';
import {palette} from 'src/styles';
import {HomeScreen, SearchScreen} from 'src/screens';

const BOTTOM_TABS_HEIGHT = 60;
const screensData = [
  {
    name: Route.HOME,
    component: HomeScreen,
    icon: 'ios-book',
    tabColor: palette.primary,
  },
  {
    name: Route.SEARCH,
    component: SearchScreen,
    icon: 'ios-search',
    tabColor: palette.secondary,
  },
];
const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  const [backgroundColor, setBackgroundColor] = useState(palette.primary);
  const tabBarStyle: StyleProp<ViewStyle> = {
    backgroundColor,
    borderTopWidth: 1,
    height: BOTTOM_TABS_HEIGHT + useSafeAreaInsets().bottom,
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle,
        headerShown: false,
      }}>
      {screensData.map((item, index) => (
        <Tab.Screen
          name={item.name}
          key={index + item.name}
          component={item.component}
          options={{
            tabBarButton: ({onPress, accessibilityState}) => (
              <TabIcon
                onPress={onPress}
                focused={!!accessibilityState?.selected}
                name={item.icon}
                tabColor={item.tabColor}
                setBackgroundColor={setBackgroundColor}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
