import type { BookSearchResult } from '../types';
import { useCallback, useState } from 'react';
import { useLazySearchBooksWithPageQuery } from '../store/api/bookApi.ts';

interface UseBookSearchReturn {
  searchResults: BookSearchResult[];
  isLoading: boolean;
  error: string | null;
  searchBooks: (query: string) => void;
  clearSearch: () => void;
  nextPage: () => void;
  prevPage: () => void;
  currentPage: number;
  currentQuery: string;
}

export const useBookSearch = (): UseBookSearchReturn => {
  const [searchResults, setSearchResults] = useState<BookSearchResult[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trigger] = useLazySearchBooksWithPageQuery();

  const performSearch = useCallback(
    async (query: string, page: number) => {
      if (!query.trim()) {
        setSearchResults([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await trigger({ title: query.trim(), page }).unwrap();
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

  const searchBooks = useCallback(
    (query: string) => {
      setCurrentQuery(query);
      setCurrentPage(1);
      performSearch(query, 1);
    },
    [performSearch]
  );

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setCurrentPage(1);
    setCurrentQuery('');
    setError(null);
    setIsLoading(false);
  }, []);

  const nextPage = useCallback(() => {
    if (currentQuery.trim()) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      performSearch(currentQuery, newPage);
    }
  }, [currentQuery, currentPage, performSearch]);

  const prevPage = useCallback(() => {
    if (currentQuery.trim() && currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      performSearch(currentQuery, newPage);
    }
  }, [currentQuery, currentPage, performSearch]);

  return {
    searchResults,
    isLoading,
    error: error ? 'Failed to search books. Please try again.' : null,
    searchBooks,
    clearSearch,
    nextPage,
    prevPage,
    currentPage,
    currentQuery,
  };
};
