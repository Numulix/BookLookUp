import type { Author, BookDetails } from '../types';
import { getBookCoverUrl } from '../utils';
import { ArrowLeftIcon, BookOpenIcon, TagIcon, UserIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router';

interface BookDetailsContentProps {
  book: BookDetails;
  authors?: Author[];
  firstAuthor?: Author | undefined;
  additionalAuthorsCount?: number;
  isLoadingAuthors: boolean;
}

export const BookDetailsContent = ({
  book,
  authors,
  firstAuthor = undefined,
  additionalAuthorsCount = 0,
  isLoadingAuthors,
}: BookDetailsContentProps) => {
  const coverUrl = getBookCoverUrl(book.covers?.[0]);

  const description =
    typeof book.description === 'string'
      ? book.description
      : book.description?.type === '/type/text'
        ? book.description.value
        : '';

  const displaySubjects = book.subjects?.slice(0, 10) || [];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <Link to="/" className="text-primary-600 hover:text-primary-700 inline-flex items-center transition-colors">
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Search
        </Link>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            {coverUrl ? (
              <img
                src={coverUrl}
                alt={`Cover of ${book.title}`}
                className="mx-auto w-full max-w-sm rounded-lg shadow-lg"
              />
            ) : (
              <div className="mx-auto flex h-96 w-full max-w-sm items-center justify-center rounded-lg bg-gray-200">
                <div className="text-center">
                  <BookOpenIcon className="mx-auto mb-2 h-16 w-16 text-gray-400" />
                  <p className="text-gray-500">No Cover Available</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6 md:col-span-2">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">{book.title}</h1>

              <div className="mb-4 flex items-start text-gray-600">
                <UserIcon className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                <div>
                  {isLoadingAuthors ? (
                    <div className="space-y-1">
                      <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
                      <div className="h-3 w-24 animate-pulse rounded bg-gray-200"></div>
                    </div>
                  ) : firstAuthor ? (
                    <div>
                      <span className="text-lg">
                        by {firstAuthor.name}{' '}
                        {firstAuthor.alternate_names &&
                          firstAuthor.alternate_names.length > 0 &&
                          `(${firstAuthor.alternate_names.join(', ')})`}
                      </span>
                      {additionalAuthorsCount > 0 && (
                        <div className="mt-1 text-sm text-gray-500">
                          {additionalAuthorsCount === 1
                            ? '+1 other author'
                            : `+${additionalAuthorsCount} other authors`}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-lg">by Unknown Author</span>
                  )}
                </div>
              </div>
            </div>

            {description && (
              <div>
                <h2 className="mb-3 text-xl font-semibold text-gray-900">Description</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="leading-relaxed whitespace-pre-line text-gray-700">{description}</p>
                </div>
              </div>
            )}

            {authors && authors.length > 1 && !isLoadingAuthors && (
              <div>
                <h2 className="mb-3 text-xl font-semibold text-gray-900">All Authors</h2>
                <div className="space-y-2">
                  {authors.map((author, index) => (
                    <div key={author.key} className="text-gray-700">
                      {index + 1}. {author.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {displaySubjects.length > 0 && (
              <div>
                <h2 className="mb-3 flex items-center text-xl font-semibold text-gray-900">
                  <TagIcon className="mr-2 h-5 w-5" />
                  Subjects
                </h2>
                <div className="flex flex-wrap gap-2">
                  {displaySubjects.map((subject, index) => (
                    <span
                      key={index}
                      className="bg-primary-50 text-primary-700 border-primary-200 rounded-full border px-3 py-1 text-sm"
                    >
                      {subject}
                    </span>
                  ))}
                  {book.subjects && book.subjects.length > 10 && (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                      +{book.subjects.length - 10} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {firstAuthor && firstAuthor.bio && (
        <div className="p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div>
                <h1 className="mb-2 text-3xl font-bold text-gray-900">About {firstAuthor.name}</h1>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-semibold text-gray-900">Biography</h2>
                <h3 className="text-md mb-3 text-gray-600">Born {firstAuthor.birth_date}</h3>
                <div className="prose prose-gray max-w-none">
                  {typeof firstAuthor.bio === 'string' ? (
                    <p className="leading-relaxed text-gray-700">{firstAuthor.bio}</p>
                  ) : (
                    <p className="leading-relaxed text-gray-700">{firstAuthor.bio.value}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6 md:col-span-1">
              {firstAuthor.photos && firstAuthor.photos.length > 0 ? (
                <img
                  src={getBookCoverUrl(firstAuthor.photos[0])}
                  alt={`Cover of ${firstAuthor.name}`}
                  className="mx-auto w-full max-w-sm rounded-lg shadow-lg"
                />
              ) : (
                <div className="mx-auto flex h-96 w-full max-w-sm items-center justify-center rounded-lg bg-gray-200">
                  <div className="text-center">
                    <UserIcon className="mx-auto mb-2 h-16 w-16 text-gray-400" />
                    <p className="text-gray-500">No Photo Available</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
