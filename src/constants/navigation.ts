import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Book} from 'src/models';

export enum Route {
  HOME_NAVIGATOR = 'HomeNavigator',
  HOME = 'Home',
  SEARCH = 'Search',
  DETAILS = 'Details',
  AUTH = 'Auth',
  LOGIN = 'Login',
  REGISTER = 'Register',
}
type DetailsScreenParams = {
  book: Book;
  id: string;
};
export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  HomeNavigator: undefined;
  Auth: undefined;
  Login: undefined;
  Register: undefined;
  Details: DetailsScreenParams;
};
export type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
export type DetailsScreenProp = StackNavigationProp<RootStackParamList, 'Details'>;
export type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;
export type LoginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type RegisterScreenProp = StackNavigationProp<RootStackParamList, 'Register'>;
