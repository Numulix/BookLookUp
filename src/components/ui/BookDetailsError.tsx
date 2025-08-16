import { Link } from 'react-router';
import { ArrowLeftIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export const BookDetailsError = () => (
  <div className="mx-auto max-w-4xl">
    <div className="mb-6">
      <Link to="/" className="text-primary-600 hover:text-primary-700 inline-flex items-center">
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back to Search
      </Link>
    </div>

    <div className="card p-8 text-center">
      <ExclamationTriangleIcon className="mx-auto mb-4 h-16 w-16 text-red-500" />
      <h1 className="mb-2 text-2xl font-bold text-gray-900">Book Not Found</h1>
      <p className="mb-4 text-gray-600">Sorry, we couldn't find the details for this book.</p>
      <Link to="/" className="btn-primary">
        Back to Search
      </Link>
    </div>
  </div>
);
