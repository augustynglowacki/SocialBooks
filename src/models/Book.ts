export interface Book {
  id: string;
  volumeInfo: {
    title?: string;
    authors?: string[];
    description?: string;
    averageRating?: number;
    ratingCount?: number;
    imageLinks?: {
      thumbnail?: string;
    };
  };
}
