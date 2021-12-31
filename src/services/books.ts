import {API_KEY, API_URL} from '@env';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {convertToBook} from 'src/helpers/convertResponse';
import {Book} from 'src/models';
// import {convertTobookss} from 'src/helpers/convertResponse';
// import {books} from 'src/ts/interfaces/books';
// import {RootObject} from 'src/ts/interfaces/topbooksResponse';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
  }),
  tagTypes: ['Book'],
  endpoints: builder => ({
    getBook: builder.query<Book, void>({
      query: () => ({
        url: `v1/volumes/3zDnCgAAQBAJ?&country=pl&key=${API_KEY}`,
      }),
      transformResponse: (response: Book) => convertToBook(response),
      providesTags: [{type: 'Book', id: 'LIST'}],
    }),
  }),
});

export const {useGetBookQuery} = booksApi;
