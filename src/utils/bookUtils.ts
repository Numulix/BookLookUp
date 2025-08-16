export const getBookCoverUrl = (coverId: number | undefined): string | undefined => {
  if (!coverId) return undefined;
  return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
};

export const formatAuthorNames = (authorNames?: string[]): string => {
  if (!authorNames || authorNames.length === 0) {
    return 'Unknown author';
  }

  if (authorNames.length === 1) {
    return authorNames[0];
  }

  if (authorNames.length === 2) {
    return `${authorNames[0]} and ${authorNames[1]}`;
  }

  if (authorNames.length === 3) {
    return `${authorNames[0]} and ${authorNames.length - 1} others`;
  }

  return 'Unknown author';
};

export const extractBookId = (key: string): string => {
  return key.replace('/works/', '');
};

export const extractAuthorId = (key: string): string => {
  return key.replace('/authors/', '');
};
