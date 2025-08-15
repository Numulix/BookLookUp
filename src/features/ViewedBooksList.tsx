import { useNavigate } from 'react-router';
import { useViewedBooks } from '../context/ViewedBooksContext.tsx';
import { ClockIcon } from '@heroicons/react/24/outline';
import { extractBookId, formatAuthorNames, getBookCoverUrl } from '../utils';

export const ViewedBooksList = () => {
  const navigate = useNavigate();
  const { viewedBooks } = useViewedBooks();

  if (viewedBooks.length === 0) {
    return (
      <div className="p-6">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
          <ClockIcon className="h-5 w-5 text-gray-400" />
          Recently Viewed
        </h2>
        <div className="py-8 text-center">
          <div className="mb-4 text-4xl">👁️</div>
          <p className="text-gray-600">No books viewed yet.</p>
          <p className="mt-1 text-sm text-gray-500">Books you view will appear here for easy access.</p>
        </div>
      </div>
    );
  }

  const handleBookClick = (bookKey: string) => {
    const bookId = extractBookId(bookKey);
    navigate(`/books/${bookId}`);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
          <ClockIcon className="h-5 w-5" />
          Recently Viewed ({viewedBooks.length})
        </h2>
      </div>

      <div className="max-h-96 space-y-3 overflow-y-auto rounded-xl border border-gray-500 shadow-md">
        {viewedBooks.map((book) => {
          const coverUrl = getBookCoverUrl(book.cover_i);

          return (
            <div
              key={book.key}
              onClick={() => handleBookClick(book.key)}
              className="group flex cursor-pointer items-center space-x-3 rounded-lg p-3 transition-colors hover:bg-gray-50"
            >
              <div className="flex-shrink-0">
                {coverUrl ? (
                  <img
                    src={coverUrl}
                    alt={`Cover of ${book.title}`}
                    className="h-16 w-12 rounded object-cover shadow-sm"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-16 w-12 items-center justify-center rounded bg-gray-200">
                    <span className="text-xs text-gray-400">No Cover</span>
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-1 font-medium text-gray-900 transition-colors group-hover:text-gray-700">
                  {book.title}
                </h3>
                <p className="line-clamp-1 text-sm text-gray-600">{formatAuthorNames(book.author_name)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
