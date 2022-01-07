import {Book, Review} from 'src/models/';

export const convertToBook = ({id, volumeInfo}: Book): Book => ({
  id,
  volumeInfo: {
    title: volumeInfo.title,
    authors: volumeInfo.authors,
    description: volumeInfo.description,
    averageRating: volumeInfo.averageRating,
    ratingCount: volumeInfo.ratingCount,
    imageLinks: {
      thumbnail: volumeInfo.imageLinks?.thumbnail,
    },
  },
});

export const convertToBooks = (response: Book[]): Book[] => {
  if (!!response?.length) {
    return response.map(({id, volumeInfo}: Book) => ({
      id,
      volumeInfo: {
        title: volumeInfo.title,
        authors: volumeInfo.authors,
        description: volumeInfo.description,
        averageRating: volumeInfo.averageRating,
        ratingCount: volumeInfo.ratingCount,
        imageLinks: {
          thumbnail: volumeInfo.imageLinks?.thumbnail,
        },
      },
    }));
  }
  return [] as Book[];
};
// export const convertToReview = (response: Review[]): Review[] => {
//   if (!!response?.length) {
//     return response.map((review: Review) => ({
//       id: review.id,
//       book: review.book,
//       reviewTitle: review.reviewTitle,
//       reviewDescription: review.reviewDescription,
//       createdDate: review.createdDate,
//       rating: review.rating,
//       likes: review.likes,
//       comments: review.comments,
//     }));
//   }
//   return [] as Review[];
// };
