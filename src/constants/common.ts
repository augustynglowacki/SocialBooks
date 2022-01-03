/* eslint-disable @typescript-eslint/no-explicit-any */
export const DEFAULT_AVATAR =
  'https://firebasestorage.googleapis.com/v0/b/moviepicker-2405b.appspot.com/o/users%2Fdefault%2FdefaultAvatar.png?alt=media&token=e8f0dd01-d427-4734-b161-504d46c7893c';
import {SerializedError} from '@reduxjs/toolkit';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';
type ErrorType = FetchBaseQueryError | SerializedError | undefined | any;
export type {ErrorType};
