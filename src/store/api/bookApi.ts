import { createApi, fetchBaseQuery, type FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { Author, BookDetails, BookSearchResponse, BookSearchResult } from '../../types';

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
    getAuthorsByKeys: builder.query<Author[], string[]>({
      queryFn: async (authorKeys, _queryApi, _extraOptions, baseQuery) => {
        if (!authorKeys || authorKeys.length === 0) {
          return { data: [] };
        }

        const results = await Promise.all(authorKeys.map((key) => baseQuery(`/authors/${key}.json`)));
        const firstError = results.find((result) => result.error);
        if (firstError) {
          return { error: firstError.error as FetchBaseQueryError };
        }

        const transformedAuthors: Author[] = results
          .map((result) => {
            const author = result.data as Author;
            if (!author) return null;

            return {
              key: author.key,
              name: author.name,
              bio: { type: author.bio?.type || '', value: author.bio?.value || '' },
              birth_date: author.birth_date || '',
            };
          })
          .filter((author) => !!author);

        return { data: transformedAuthors };
      },
    }),
  }),
});

export const { useSearchBooksQuery, useGetBookDetailsQuery, useLazySearchBooksQuery, useGetAuthorsByKeysQuery } =
  bookApi;
