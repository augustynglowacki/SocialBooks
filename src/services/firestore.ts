import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Book, Review} from 'src/models';

export const setData = async (book: Book, name: string) => {
  const {volumeInfo, id} = book;
  const title = volumeInfo?.title ?? '';
  const description = volumeInfo?.description ?? '';
  const averageRating = volumeInfo?.averageRating ?? 0;
  const ratingCount = volumeInfo?.ratingCount ?? 0;
  const authors = volumeInfo?.authors ?? [];
  const imagePath = volumeInfo?.imageLinks?.thumbnail ?? '';
  const db = firestore();
  const userId = auth().currentUser?.uid;

  if (!userId) {
    return null;
  }

  const docRef = db.collection('users').doc(userId).collection(name).doc(id);
  const doc = await docRef.get();

  if (doc.exists) {
    docRef.delete();
  }
  if (!doc.exists) {
    docRef.set({title, description, averageRating, ratingCount, authors, imagePath});
  }
};

export const setReview = async (review: Review) => {
  const {
    book: {volumeInfo},
    id,
  } = review;
  const db = firestore();
  const userId = auth().currentUser?.uid;

  const reviewDescription = review.reviewDescription ?? '';
  const reviewTitle = review.reviewTitle ?? '';
  const createdBy = userId ?? '';
  const createdDate = review.createdDate ?? '';
  const comments = review.reviewDescription ?? [''];
  const likes = review.likes ?? 0;
  const rating = review.rating ?? 0;
  const title = volumeInfo?.title ?? '';
  const description = volumeInfo?.description ?? '';
  const averageRating = volumeInfo?.averageRating ?? 0;
  const ratingCount = volumeInfo?.ratingCount ?? 0;
  const authors = volumeInfo?.authors ?? [];
  const imagePath = volumeInfo?.imageLinks?.thumbnail ?? '';

  if (!userId) {
    return null;
  }

  // const docRef = db.collection('users').doc(userId).collection('reviews').doc(id);
  // const doc = await docRef.get();
  const globalDocRef = db.collection('reviews').doc(id.toString());
  const globalDoc = await globalDocRef.get();

  // if (doc.exists) {
  //   docRef.delete();
  // }
  if (globalDoc.exists) {
    globalDocRef.delete();
  }
  // if (!doc.exists) {
  //   docRef.set({
  //     book: {title, description, averageRating, ratingCount, authors, imagePath},
  //     createdBy: userId,
  //     createdDate,
  //     reviewDescription,
  //     reviewTitle,
  //     comments,
  //     likes,
  //     rating,
  //   });
  // }
  if (!globalDoc.exists) {
    globalDocRef.set({
      book: {id, title, description, averageRating, ratingCount, authors, imagePath},
      createdBy,
      createdDate,
      reviewDescription,
      reviewTitle,
      comments,
      likes,
      rating,
    });
  }
};
// id: string;
// book: Book;
// createdBy: string;
// createdDate: string;
// reviewTitle: string;
// reviewDescription: string;
// rating: number;
// likes: number;
// comments: string[];
