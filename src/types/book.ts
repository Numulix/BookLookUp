export interface BookSearchResponse {
  numFound: number;
  start: number;
  docs: BookSearchResult[];
}

export interface BookSearchResult {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  ia: string[];
}

export interface BookDetails {
  key: string;
  title: string;
  description?: { type: string; value: string } | string;
  authors?: Array<{ author: { key: string }; type: { key: string } }>;
  subjects?: string[];
  covers?: number[];
}

export interface ViewedBook {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
}

export interface Author {
  key: string;
  name: string;
  bio?: { type: string; value: string };
  birth_date?: string;
}
