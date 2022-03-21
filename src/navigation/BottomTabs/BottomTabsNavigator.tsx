import React, {useCallback, useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleProp, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AnyScreenProp, Route} from 'src/constants';
import {TabIcon} from './TabIcon';
import {palette} from 'src/styles';
import {CommunityScreen, HomeScreen, ProfileScreen, SearchScreen} from 'src/screens';
import auth from '@react-native-firebase/auth';
import {batch, useDispatch} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getFavorite, getFollowing, getReviews} from 'src/redux/collections/collectionsActions';
import {getUserData} from 'src/redux/user/userActions';

const BOTTOM_TABS_HEIGHT = 60;
const screensData = [
  {
    name: Route.HOME,
    component: HomeScreen,
    icon: 'ios-book',
    tabColor: palette.primary,
  },
  {
    name: Route.COMMUNITY,
    component: CommunityScreen,
    icon: 'ios-people',
    tabColor: palette.secondary,
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
      batch(() => {
        dispatch(getFollowing());
        dispatch(getFavorite());
        dispatch(getReviews());
        dispatch(getUserData());
      });
    }, [dispatch]),
  );

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
