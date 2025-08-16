export const BookDetailsLoading = () => (
  <div className="mx-auto max-w-4xl">
    <div className="mb-6">
      <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
    </div>

    <div className="card p-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="h-96 w-full animate-pulse rounded-lg bg-gray-200"></div>
        </div>

        <div className="space-y-4 md:col-span-2">
          <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
          <div className="space-y-2">
            <div className="h-4 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
