import { useState } from 'react';
import { useBookSearch } from '../../hooks/useBookSearch.ts';

export const Search = () => {
  const [query, setQuery] = useState('');
  const { searchResults, isLoading, error, searchBooks } = useBookSearch();

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
            {searchResults.slice(0, 10).map((book) => (
              <h4 key={book.key}>{book.title}</h4>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
