import {API_KEY, API_URL} from '@env';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {convertToBook} from 'src/helpers/convertResponse';
import {Book} from 'src/models';
// import {convertTobookss} from 'src/helpers/convertResponse';
// import {books} from 'src/ts/interfaces/books';
// import {RootObject} from 'src/ts/interfaces/topbooksResponse';

console.log('api kod', API_URL);
export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
  }),
  tagTypes: ['Popular'],
  endpoints: builder => ({
    getPopular: builder.query<Book, void>({
      query: () => ({
        url: `v1/volumes/zyTCAlFPjgYC?key=${API_KEY}`,
      }),
      transformResponse: (response: Book) => convertToBook(response),
      providesTags: [{type: 'Popular', id: 'LIST'}],
    }),
  }),
});

export const {useGetPopularQuery} = booksApi;
