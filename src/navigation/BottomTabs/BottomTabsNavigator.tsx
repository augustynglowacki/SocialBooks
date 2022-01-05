import React, {useCallback, useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleProp, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Route} from 'src/constants';
import {TabIcon} from './TabIcon';
import {palette} from 'src/styles';
import {HomeScreen, ProfileScreen, SearchScreen} from 'src/screens';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {userSelector} from 'src/redux/user/userSlice';
import {useFocusEffect} from '@react-navigation/native';
import {getFavorite} from 'src/redux/collections/collectionsActions';

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
  {
    name: Route.PROFILE,
    component: ProfileScreen,
    icon: 'ios-person',
    tabColor: palette.third,
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
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(getFavorite());
    }, [dispatch]),
  );
  const {
    user: {userName},
  } = useSelector(userSelector);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle,
        headerShown: false,
      }}>
      {screensData.slice(0, !!userName ? 3 : 2).map((item, index) => (
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
