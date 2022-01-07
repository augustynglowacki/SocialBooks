import {Book} from './book';
import {Review} from './review';

export interface CollectionsState {
  favorite: Book[];
  reviews: Review[];
  error: string;
  loading: boolean;
}
