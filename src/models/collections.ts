import {Book} from './book';
import {Challenge} from './challenge';
import {Favorite} from './favorite';
import {Review} from './review';

export interface CollectionsState {
  favorite: Favorite[];
  reviews: Review[];
  following: string[];
  challenges: Challenge[];
  error: string;
  loading: boolean;
}
export type CommunityFeedData = Array<Review | Favorite>;
