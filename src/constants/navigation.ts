import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Book, Review} from 'src/models';

export enum Route {
  HOME_NAVIGATOR = 'HomeNavigator',
  HOME = 'Home',
  SEARCH = 'Search',
  DETAILS = 'Details',
  REVIEW_DETAILS = 'ReviewDetails',
  LOGIN = 'Login',
  REGISTER = 'Register',
  PROFILE = 'Profile',
  ADD_REVIEW_SCREEN = 'AddReview',
  WELCOME = 'Welcome',
}
type DetailsScreenParams = {
  book: Book;
  id: string;
};
type ReviewDetailsScreenParams = {
  reviewData: Review;
  id: string;
};
type AddReviewScreenParams = {
  book: Book;
  id: string;
};
export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  HomeNavigator: undefined;
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  Details: DetailsScreenParams;
  ReviewDetails: ReviewDetailsScreenParams;
  AddReview: AddReviewScreenParams;
  Welcome: undefined;
};
export type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type SearchScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
export type DetailsScreenProp = StackNavigationProp<RootStackParamList, 'Details'>;
export type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;
export type ReviewDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ReviewDetails'>;
export type ReviewDetailsScreenProp = StackNavigationProp<RootStackParamList, 'ReviewDetails'>;
export type ReviewDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ReviewDetails'>;
export type AddReviewScreenRouteProp = RouteProp<RootStackParamList, 'AddReview'>;
export type AddReviewScreenProp = StackNavigationProp<RootStackParamList, 'AddReview'>;
export type AddReviewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddReview'>;
export type LoginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type RegisterScreenProp = StackNavigationProp<RootStackParamList, 'Register'>;
export type WelcomeScreenProp = StackNavigationProp<RootStackParamList, 'Welcome'>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyScreenProp = StackNavigationProp<RootStackParamList, any>;
