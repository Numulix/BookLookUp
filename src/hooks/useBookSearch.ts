import type { BookSearchResult } from '../types';
import { useCallback, useState } from 'react';
import { useLazySearchBooksQuery } from '../store/api/bookApi.ts';

interface UseBookSearchReturn {
  searchResults: BookSearchResult[];
  isLoading: boolean;
  error: string | null;
  searchBooks: (query: string) => void;
  clearSearch: () => void;
}

export const useBookSearch = (): UseBookSearchReturn => {
  const [searchResults, setSearchResults] = useState<BookSearchResult[]>([]);
  const [trigger, { isLoading, error }] = useLazySearchBooksQuery();

  const searchBooks = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const result = await trigger(query.trim()).unwrap();
        setSearchResults(result);
      } catch (err) {
        console.error('Search failed:', err);
        setSearchResults([]);
      }
    },
    [trigger]
  );

  const clearSearch = useCallback(() => setSearchResults([]), []);

  return {
    searchResults,
    isLoading,
    error: error ? 'Failed to search books. Please try again.' : null,
    searchBooks,
    clearSearch,
  };
};
