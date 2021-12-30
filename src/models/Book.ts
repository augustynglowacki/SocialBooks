export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    pageCount: string;
    categories: string[];
    averageRating: string;
    ratingsCount: string;
    imageLinks: {
      thumbnail: string;
    };
  };
  saleInfo: {
    buyLink: string;
    retailPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  accessInfo: {
    webReaderLink: string;
  };
}
