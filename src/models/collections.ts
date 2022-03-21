import {Book} from './book';
import {Review} from './review';

export interface CollectionsState {
  favorite: Book[];
  reviews: Review[];
  following: string[];
  error: string;
  loading: boolean;
}
