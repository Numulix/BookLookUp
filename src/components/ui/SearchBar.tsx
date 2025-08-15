import { useEffect, useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  isLoading?: boolean;
  placeholder?: string;
}

export const SearchBar = ({
  onSearch,
  onClear,
  isLoading = false,
  placeholder = 'Search for books by title',
}: SearchBarProps) => {
  const [inputValue, setInputValue] = useState('');

  const debouncedSearch = useDebounceCallback(onSearch, 300);

  useEffect(() => {
    if (inputValue.trim()) {
      debouncedSearch(inputValue.trim());
    } else {
      onClear();
    }
  }, [inputValue, debouncedSearch, onClear]);

  const handleClear = () => {
    setInputValue('');
    onClear();
  };

  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className={`h-5 w-5 transition-colors ${isLoading ? 'animate-pulse text-gray-500' : 'text-gray-400'}`}
          />
        </div>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 py-3 pr-12 pl-10 text-lg text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-transparent focus:ring-2"
          placeholder={placeholder}
          disabled={isLoading}
        />

        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition-colors hover:text-gray-600"
            disabled={isLoading}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {isLoading && (
        <div className="absolute top-full right-0 left-0 mt-1 flex items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-600 border-t-transparent" />
            Searching...
          </div>
        </div>
      )}
    </div>
  );
};
