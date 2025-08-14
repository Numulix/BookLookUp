import { useState } from 'react';
import { useBookSearch } from '../../hooks/useBookSearch.ts';
import { formatAuthorNames, getBookCoverUrl } from '../../utils';
import { useViewedBooks } from '../../context/ViewedBooksContext.tsx';

export const Search = () => {
  const [query, setQuery] = useState('');
  const { searchResults, isLoading, error, searchBooks } = useBookSearch();
  const { addViewedBook, viewedBooks } = useViewedBooks();

  const handleSearch = () => {
    searchBooks(query);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="card p-6">
        <h3 className="mb-4 text-lg font-semibold">Search Books:</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books..."
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} type="button" className="btn-primary">
            Search
          </button>
        </div>

        {isLoading && <p className="mt-4 text-gray-600">Loading...</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>

      {searchResults.length > 0 && (
        <div className="card p-6">
          <h3 className="mb-4 text-lg font-semibold">Search Results</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {searchResults.slice(0, 9).map((book) => (
              <div key={book.key}>
                <h4>{book.title}</h4>
                <h5>{formatAuthorNames(book.author_name)}</h5>
                {book.cover_i && <img src={getBookCoverUrl(book.cover_i)} alt={book.title} />}
                <button type="button" className="mt-2 bg-gray-100 text-xs" onClick={() => addViewedBook(book)}>
                  Add to Viewed
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewedBooks.length > 0 && (
        <div className="mt-4 mb-4">
          <div className="mb-2">Viewed Books</div>
          {viewedBooks.map((book) => (
            <h1 key={book.key}>{book.title}</h1>
          ))}
        </div>
      )}
    </div>
  );
};
