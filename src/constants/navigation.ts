import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Book, Review} from 'src/models';
import {Challenge} from 'src/models/challenge';

export enum Route {
  HOME_NAVIGATOR = 'HomeNavigator',
  HOME = 'Home',
  COMMUNITY = 'Community',
  SEARCH = 'Search',
  DETAILS = 'Details',
  REVIEW_DETAILS = 'ReviewDetails',
  LOGIN = 'Login',
  REGISTER = 'Register',
  PROFILE = 'Profile',
  ADD_REVIEW_SCREEN = 'AddReview',
  WELCOME = 'Welcome',
  CHALLENGES = 'Challenges',
  CHALLENGE_DETAILS = 'ChallengeDetails',
  ADD_CHALLENGE = 'AddChallenge',
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

type ChallengeDetailsScreenParams = {
  challengeData: Challenge;
};

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Community: undefined;
  Search: undefined;
  HomeNavigator: undefined;
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  Details: DetailsScreenParams;
  ReviewDetails: ReviewDetailsScreenParams;
  AddReview: AddReviewScreenParams;
  Challenges: undefined;
  ChallengeDetails: ChallengeDetailsScreenParams;
  AddChallenge: undefined;
};

export type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type ChallengesScreenProp = StackNavigationProp<RootStackParamList, 'Challenges'>;
export type CommunityScreenProp = StackNavigationProp<RootStackParamList, 'Community'>;
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
export type ChallengeDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ChallengeDetails'>;
export type ChallengeDetailsScreenProp = StackNavigationProp<RootStackParamList, 'ChallengeDetails'>;
export type ChallengeDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChallengeDetails'>;
export type AddChallengeScreenProp = StackNavigationProp<RootStackParamList, 'AddChallenge'>;
export type LoginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type RegisterScreenProp = StackNavigationProp<RootStackParamList, 'Register'>;
export type WelcomeScreenProp = StackNavigationProp<RootStackParamList, 'Welcome'>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyScreenProp = StackNavigationProp<RootStackParamList, any>;
