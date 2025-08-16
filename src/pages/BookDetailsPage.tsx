import { Link, useParams } from 'react-router';
import { useViewedBooks } from '../context/ViewedBooksContext.tsx';
import { useGetAuthorsByKeysQuery, useGetBookDetailsQuery } from '../store/api/bookApi.ts';
import { extractAuthorId } from '../utils';
import { useEffect } from 'react';
import type { ViewedBook } from '../types';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { BookDetailsError, BookDetailsLoading } from '../components/ui';
import { BookDetailsContent } from '../features/BookDetailsContent.tsx';

export const BookDetailsPage = () => {
  const { id } = useParams();
  const { addViewedBook } = useViewedBooks();

  const { data: book, isLoading: isLoadingBook, error: bookError } = useGetBookDetailsQuery(id!, { skip: !id });

  const authorKeys = book?.authors?.map((author) => extractAuthorId(author.author.key)) || [];

  const { data: authors, isLoading: isLoadingAuthors } = useGetAuthorsByKeysQuery(authorKeys, { skip: !authorKeys });

  const firstAuthor = authors?.[0];
  const additionalAuthorsCount = authors ? authors.length : 0;

  useEffect(() => {
    if (book && id && authors && authors.length > 0) {
      const viewedBook: ViewedBook = {
        key: book.key,
        title: book.title,
        author_name: authors.map((author) => author.name),
        cover_i: book.covers?.[0],
      };

      addViewedBook(viewedBook);
    }
  }, [book, id, authors, addViewedBook]);

  if (!id) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="card p-8 text-center">
          <ExclamationTriangleIcon className="mx-auto mb-4 h-16 w-16 text-red-500" />
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Invalid Book ID</h1>
          <p className="mb-4 text-gray-600">The book ID is missing or invalid.</p>
          <Link to="/" className="btn-primary">
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  if (isLoadingBook || isLoadingAuthors) {
    return <BookDetailsLoading />;
  }

  if (bookError || !book) {
    return <BookDetailsError />;
  }

  return (
    <BookDetailsContent
      book={book}
      isLoadingAuthors={isLoadingAuthors}
      authors={authors}
      firstAuthor={firstAuthor}
      additionalAuthorsCount={additionalAuthorsCount}
    />
  );
};
