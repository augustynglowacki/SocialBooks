import {Book} from './book';

export interface CollectionsState {
  favorite: Book[];
  error: string;
  loading: boolean;
}
