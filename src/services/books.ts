import {API_KEY, API_URL} from '@env';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import {convertTobookss} from 'src/helpers/convertResponse';
// import {books} from 'src/ts/interfaces/books';
// import {RootObject} from 'src/ts/interfaces/topbooksResponse';

export interface Post {
  id: string;
  title: string;
  body: string;
  userId: number;
}
console.log('api kod', API_URL);
export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
  }),
  tagTypes: ['Popular'],
  endpoints: builder => ({
    getPopular: builder.query<any[], void>({
      query: () => ({
        url: `v1/volumes/zyTCAlFPjgYC?key=${API_KEY}`,
        // headers: 'key',
      }),
      //   transformResponse: ({response}: any) => convertToBooks(response),
      providesTags: [{type: 'Popular', id: 'LIST'}],
    }),
  }),
});

export const {useGetPopularQuery} = booksApi;
