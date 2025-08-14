import type { BookSearchResult, ViewedBook } from '../types';
import { createContext, type ReactNode, use, useCallback } from 'react';
import { useLocalStorage } from 'usehooks-ts';

interface ViewedBooksContextType {
  viewedBooks: ViewedBook[];
  addViewedBook: (book: BookSearchResult | ViewedBook) => void;
  isBookViewed: (bookKey: string) => boolean;
}

const ViewedBooksContext = createContext<ViewedBooksContextType | undefined>(undefined);

interface ViewedBooksProviderProps {
  children: ReactNode;
}

const MAX_BOOKS = 20;

export const ViewedBooksProvider = ({ children }: ViewedBooksProviderProps) => {
  const [viewedBooks, saveViewedBooks] = useLocalStorage<ViewedBook[]>('viewedBooks', []);

  const addViewedBook = useCallback(
    (book: BookSearchResult | ViewedBook) => {
      const viewedBook: ViewedBook = {
        key: book.key,
        title: book.title,
        author_name: book.author_name,
        cover_i: book.cover_i,
      };

      saveViewedBooks((prevBooks: ViewedBook[]) => {
        const filtered = prevBooks.filter((existingBook) => existingBook.key !== viewedBook.key);
        return [viewedBook, ...filtered].slice(0, MAX_BOOKS);
      });
    },
    [saveViewedBooks]
  );

  const isBookViewed = useCallback(
    (bookKey: string) => {
      return viewedBooks.some((book: ViewedBook) => book.key === bookKey);
    },
    [viewedBooks]
  );

  const value: ViewedBooksContextType = {
    viewedBooks,
    addViewedBook,
    isBookViewed,
  };

  return <ViewedBooksContext value={value}>{children}</ViewedBooksContext>;
};

export const useViewedBooks = (): ViewedBooksContextType => {
  const context = use(ViewedBooksContext);
  if (context === undefined) {
    throw new Error('useViewedBooks must be used within the context');
  }
  return context;
};
