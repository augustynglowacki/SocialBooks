export interface Book {
  id: string;
  volumeInfo: {
    title?: string;
    subtitle?: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    pageCount?: string;
    categories?: string[];
    averageRating?: string;
    imageLinks?: {
      thumbnail?: string;
    };
  };
  accessInfo?: {
    webReaderLink?: string;
  };
}
