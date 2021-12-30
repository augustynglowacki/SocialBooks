import {Book} from 'src/models/';

export const convertToBook = ({id, volumeInfo, accessInfo, saleInfo}: Book): Book => ({
  id,
  volumeInfo: {
    title: volumeInfo.title,
    subtitle: volumeInfo.subtitle,
    authors: volumeInfo.authors,
    publisher: volumeInfo.publisher,
    publishedDate: volumeInfo.publishedDate,
    description: volumeInfo.description,
    pageCount: volumeInfo.pageCount,
    categories: volumeInfo.categories,
    averageRating: volumeInfo.averageRating,
    ratingsCount: volumeInfo.ratingsCount,
    imageLinks: {
      thumbnail: volumeInfo.imageLinks.thumbnail,
    },
  },
  saleInfo: {
    buyLink: saleInfo.buyLink,
    retailPrice: {
      amount: saleInfo.retailPrice.amount,
      currencyCode: saleInfo.retailPrice.currencyCode,
    },
  },
  accessInfo: {
    webReaderLink: accessInfo.webReaderLink,
  },
});

export const convertToBooks = (response: Book[]): Book[] =>
  response.map(({id, volumeInfo, accessInfo, saleInfo}: Book) => ({
    id,
    volumeInfo: {
      title: volumeInfo.title,
      subtitle: volumeInfo.subtitle,
      authors: volumeInfo.authors,
      publisher: volumeInfo.publisher,
      publishedDate: volumeInfo.publishedDate,
      description: volumeInfo.description,
      pageCount: volumeInfo.pageCount,
      categories: volumeInfo.categories,
      averageRating: volumeInfo.averageRating,
      ratingsCount: volumeInfo.ratingsCount,
      imageLinks: {
        thumbnail: volumeInfo.imageLinks.thumbnail,
      },
    },
    saleInfo: {
      buyLink: saleInfo.buyLink,
      retailPrice: {
        amount: saleInfo.retailPrice.amount,
        currencyCode: saleInfo.retailPrice.currencyCode,
      },
    },
    accessInfo: {
      webReaderLink: accessInfo.webReaderLink,
    },
  }));
