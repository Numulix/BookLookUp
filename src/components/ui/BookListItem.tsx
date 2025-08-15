import type { BookSearchResult } from '../../types';
import { useNavigate } from 'react-router';
import { useViewedBooks } from '../../context/ViewedBooksContext.tsx';
import { extractBookId, formatAuthorNames, getBookCoverUrl } from '../../utils';
import { CalendarIcon, EyeIcon } from '@heroicons/react/24/outline';

interface BookListItemProps {
  book: BookSearchResult;
  showViewedIndicator?: boolean;
}

export const BookListItem = ({ book, showViewedIndicator = false }: BookListItemProps) => {
  const navigate = useNavigate();
  const { isBookViewed } = useViewedBooks();
  const isViewed = isBookViewed(book.key);

  const coverUrl = getBookCoverUrl(book.cover_i);
  const bookId = extractBookId(book.key);

  const handleClick = () => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="card group relative transform cursor-pointer p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      {showViewedIndicator && isViewed && (
        <div className="absolute top-2 right-2 z-10">
          <div className="rounded-full bg-gray-500 p-1 text-white">
            <EyeIcon className="h-4 w-4" />
          </div>
        </div>
      )}

      <div className="flex space-x-4">
        <div className="flex-shrink-0">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={`Cover of ${book.title}`}
              className="h-28 w-20 rounded-md object-cover shadow-sm transition-shadow group-hover:shadow-md"
              loading="lazy"
            />
          ) : (
            <div className="flex h-28 w-20 items-center justify-center rounded-md bg-gray-200">
              <span className="text-xs text-gray-400">No Cover</span>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="mb-1 line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-gray-700">
            {book.title}
          </h3>

          <p className="mb-2 text-sm text-gray-600">by {formatAuthorNames(book.author_name)}</p>

          <div className="flex items-center space-x-4 text-xs text-gray-500">
            {book.first_publish_year && (
              <div className="flex items-center space-x-1">
                <CalendarIcon className="h-3 w-3" />
                <span>{book.first_publish_year}</span>
              </div>
            )}
          </div>

          <div className="mt-2 text-sm text-gray-600 opacity-0 transition-opacity group-hover:opacity-100">
            Click to view details
          </div>
        </div>
      </div>
    </div>
  );
};
