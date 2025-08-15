import { BookList, SearchBar } from '../components/ui';
import { useBookSearch } from '../hooks/useBookSearch.ts';
import { ViewedBooksList } from '../features/ViewedBooksList.tsx';

export const LandingPage = () => {
  const { searchResults, isLoading, error, searchBooks, clearSearch } = useBookSearch();

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
        </div>

        <div className="lg:col-span-1">
          <ViewedBooksList />
        </div>
      </div>
    </>
  );
};
