import {SerializedError} from '@reduxjs/toolkit';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';

type ErrorType = FetchBaseQueryError | SerializedError | undefined;

export type {ErrorType};

export enum QueryFilters {
  AUTHOR = 'Autor',
  TITLE = 'Tytuł',
  FULLTEXT = 'Wyszukiwanie full-text',
}
