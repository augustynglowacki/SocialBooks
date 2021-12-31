import {Book} from 'src/models/';

export const convertToBook = ({id, volumeInfo, accessInfo}: Book): Book => ({
  id,
  volumeInfo: {
    title: volumeInfo.title,
    subtitle: volumeInfo.subtitle,
    authors: volumeInfo.authors,
    publishedDate: volumeInfo.publishedDate,
    description: volumeInfo.description,
    pageCount: volumeInfo.pageCount,
    categories: volumeInfo.categories,
    averageRating: volumeInfo.averageRating,
    imageLinks: {
      thumbnail: volumeInfo.imageLinks?.thumbnail,
    },
  },
  accessInfo: {
    webReaderLink: accessInfo?.webReaderLink,
  },
});

export const convertToBooks = (response: Book[]): Book[] =>
  response.map(({id, volumeInfo, accessInfo}: Book) => ({
    id,
    volumeInfo: {
      title: volumeInfo.title,
      subtitle: volumeInfo.subtitle,
      authors: volumeInfo.authors,
      publishedDate: volumeInfo.publishedDate,
      description: volumeInfo.description,
      pageCount: volumeInfo.pageCount,
      categories: volumeInfo.categories,
      averageRating: volumeInfo.averageRating,
      imageLinks: {
        thumbnail: volumeInfo.imageLinks?.thumbnail,
      },
    },
    accessInfo: {
      webReaderLink: accessInfo?.webReaderLink,
    },
  }));
