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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trigger] = useLazySearchBooksQuery();

  const searchBooks = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await trigger(query.trim()).unwrap();
        setSearchResults(result);
      } catch (err) {
        console.error('Search failed:', err);
        setSearchResults([]);
        setError('Failed to search books. Please try again');
      } finally {
        setIsLoading(false);
      }
    },
    [trigger]
  );

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    searchResults,
    isLoading,
    error: error ? 'Failed to search books. Please try again.' : null,
    searchBooks,
    clearSearch,
  };
};
