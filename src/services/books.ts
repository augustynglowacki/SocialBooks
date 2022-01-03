import {API_KEY, API_URL} from '@env';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {convertToBook, convertToBooks} from 'src/helpers/convertResponse';
import {Book} from 'src/models';
interface SearchQueryProps {
  items: Book[];
}
export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
  }),
  endpoints: builder => ({
    getBook: builder.query<Book, void>({
      query: () => ({
        url: `volumes/3zDnCgAAQBAJ?&country=pl&key=${API_KEY}`,
      }),
      transformResponse: (response: Book) => convertToBook(response),
    }),
    getSearchedBooks: builder.query<Book[], string>({
      query: query => {
        return {
          url: `volumes?q=${query}&country=pl&maxResults=20&key=${API_KEY}`,
        };
      },
      transformResponse: (response: SearchQueryProps) => convertToBooks(response.items),
    }),
  }),
});

export const {useGetBookQuery, useGetSearchedBooksQuery} = booksApi;
