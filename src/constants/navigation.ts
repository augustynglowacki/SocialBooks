export const SCREEN_OPTIONS = {
  headerShown: false,
  gestureEnabled: true,
  gestureResponseDistance: 200,
};
export enum Route {
  HOME = 'Home',
  SEARCH = 'Search',
  HOME_NAVIGATOR = 'HomeNavigator',
}

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  HomeNavigator: undefined;
};
