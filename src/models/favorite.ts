import {Book} from './book';

export interface Favorite {
  id: string;
  book: Book;
  createdBy?: string;
}
