import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BookDetails, BookSearchResponse, BookSearchResult } from '../../types';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://openlibrary.org/',
  }),
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    searchBooks: builder.query<BookSearchResult[], string>({
      query: (title) => `search.json?title=${encodeURIComponent(title)}`,
      transformResponse: (response: BookSearchResponse) => response.docs.filter((book) => book.cover_i),
      providesTags: ['Books'],
    }),
    getBookDetails: builder.query<BookDetails, string>({
      query: (id) => `works/${id}.json`,
      providesTags: (_result, _error, id) => [{ type: 'Books', id }],
    }),
  }),
});

export const { useSearchBooksQuery, useGetBookDetailsQuery, useLazySearchBooksQuery } = bookApi;
