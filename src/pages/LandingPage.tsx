import { BookList, SearchBar } from '../components/ui';
import { useBookSearch } from '../hooks/useBookSearch.ts';
import { ViewedBooksList } from '../features/ViewedBooksList.tsx';

export const LandingPage = () => {
  const { searchResults, isLoading, error, searchBooks, clearSearch, nextPage, prevPage, currentPage, totalPages } =
    useBookSearch();

  return (
    <>
      <div className="py-16 text-center">
        <h2 className="mb-4 text-3xl font-semibold text-gray-800">Welcome to Book Look Up 📚👀⬆️</h2>
        <p className="mx-auto max-w-2xl text-gray-600">Look up books using the Open Library API</p>
      </div>
      <SearchBar onSearch={searchBooks} onClear={clearSearch} isLoading={isLoading} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BookList
            books={searchResults}
            isLoading={isLoading}
            error={error}
            emptyMessage="No books found."
            showViewedIndicator={true}
          />

          {searchResults.length > 0 && !isLoading && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                type="button"
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <ViewedBooksList />
        </div>
      </div>
    </>
  );
};
