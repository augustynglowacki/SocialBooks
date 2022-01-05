import {SerializedError} from '@reduxjs/toolkit';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';

type ErrorType = FetchBaseQueryError | SerializedError | undefined;

export type {ErrorType};

export enum QueryFilters {
  AUTHOR = 'Author',
  TITLE = 'Title',
  FULLTEXT = 'Full-text search',
}
