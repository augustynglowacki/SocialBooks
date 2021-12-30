import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Book} from 'src/models';

export enum Route {
  HOME = 'Home',
  SEARCH = 'Search',
  HOME_NAVIGATOR = 'HomeNavigator',
  DETAILS = 'Details',
}
type DetailsScreenParams = {
  book: Book;
  id: string;
};
export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  HomeNavigator: undefined;
  Details: DetailsScreenParams;
};
export type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
export type DetailsScreenProp = StackNavigationProp<RootStackParamList, 'Details'>;
export type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;
