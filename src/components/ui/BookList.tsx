import type { BookSearchResult } from '../../types';
import { BookListItem } from './BookListItem.tsx';

interface BookListProps {
  books: BookSearchResult[];
  isLoading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  showViewedIndicator?: boolean;
}

export const BookList = ({
  books,
  isLoading = false,
  error = null,
  emptyMessage = 'No books found.',
  showViewedIndicator = false,
}: BookListProps) => {
  if (error) {
    return (
      <div className="py-12 text-center">
        <div className="mb-2 text-red-600">Search error</div>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="card animate-pulse p-4">
            <div className="flex space-x-4">
              <div className="h-28 w-20 rounded-md bg-gray-200"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                <div className="h-3 w-1/4 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 text-6xl">📚</div>
        <p className="text-lg text-gray-600">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Found {books.length} book{books.length > 1 ? 's' : ''}
        </h2>
      </div>

      <div className="space-y-4">
        {books.map((book) => (
          <BookListItem book={book} key={book.key} showViewedIndicator={showViewedIndicator} />
        ))}
      </div>
    </div>
  );
};
