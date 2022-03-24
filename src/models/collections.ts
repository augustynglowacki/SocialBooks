import {Book} from './book';
import {Favorite} from './favorite';
import {Review} from './review';

export interface CollectionsState {
  favorite: Favorite[];
  reviews: Review[];
  following: string[];
  error: string;
  loading: boolean;
}
