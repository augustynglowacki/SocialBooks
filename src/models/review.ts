import {Book} from './book';

export interface BookReview {
  id: string;
  book: Book;
  createdBy: string;
  createdDate: string;
  reviewTitle: string;
  reviewDescription: string;
  rating: number;
  likes: number;
  comments: string[];
}
