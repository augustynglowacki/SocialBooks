import {API_KEY, API_URL} from '@env';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {convertToBook, convertToBooks} from 'src/helpers/convertResponse';
import {Book} from 'src/models';
import {QueryFilters} from './queryFIlters';
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
    getSearchedBooks: builder.query<Book[], {query: string; queryType: string}>({
      query: ({query, queryType}) => {
        if (queryType === QueryFilters.AUTHOR) {
          return {
            url: `volumes?q=inauthor:${query}&country=pl&maxResults=30&key=${API_KEY}`,
          };
        }
        if (queryType === QueryFilters.TITLE) {
          return {
            url: `volumes?q=intitle:${query}&country=pl&maxResults=30&key=${API_KEY}`,
          };
        }

        return {
          url: `volumes?q=${query}&country=pl&maxResults=20&key=${API_KEY}`,
        };
      },
      transformResponse: (response: SearchQueryProps) => convertToBooks(response.items),
    }),
  }),
});

export const {useGetBookQuery, useGetSearchedBooksQuery} = booksApi;
