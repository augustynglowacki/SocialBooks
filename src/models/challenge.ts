import {Book} from './book';

export interface Challenge {
  id: string;
  book?: Book;
  createdBy?: string;
  challengeDeadline: string;
  challengeTitle: string;
  challengeDescription?: string;
  takingPart?: string[];
  completed?: string[];
}
