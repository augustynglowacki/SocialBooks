import {createAsyncThunk} from '@reduxjs/toolkit';
import {Book, Favorite, Review} from 'src/models';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {setData, setReview} from 'src/services/firestore';
import {convertToBook} from 'src/helpers/convertResponse';

export const setFavorite = createAsyncThunk<void, Book>('collections/setFavorite', async book => {
  await setData(book);
});

export const setFollowing = createAsyncThunk<void, string>('collections/setFollowing', async id => {
  await setFollowing(id);
});
export const getFollowing = createAsyncThunk<string[]>(
  'collections/getFollowing',
  () =>
    new Promise((resolve, reject) => {
      const userId = auth().currentUser?.uid ?? 'none';
      firestore()
        .collection('users')
        .doc(userId)
        .collection('following')
        .onSnapshot(
          snap => {
            resolve(snap.docs.map(doc => doc.id));
          },
          error => {
            reject(error);
          },
        );
    }),
);

export const getFavorite = createAsyncThunk<Favorite[]>(
  'collections/getFavorite',
  () =>
    new Promise((resolve, reject) => {
      firestore()
        .collection('favorite')
        .onSnapshot(
          snap => {
            resolve(
              snap.docs.map(doc => ({
                id: doc.id,
                createdBy: doc.data().createdBy,
                createdDate: doc.data().createdDate,
                book: {
                  id: doc.data().book.id,
                  volumeInfo: {
                    title: doc.data().book.volumeInfo.title,
                    description: doc.data().book.volumeInfo.description,
                    authors: doc.data().book.volumeInfo.authors,
                    averageRating: doc.data().book.volumeInfo.averageRating,
                    ratingCount: doc.data().book.volumeInfo.ratingCount,
                    imageLinks: {
                      thumbnail: doc.data().book.volumeInfo.imagePath,
                    },
                  },
                },
              })),
            );
          },
          error => {
            reject(error);
          },
        );
    }),
);
export const setReviews = createAsyncThunk<void, Review>('collections/setReviews', async review => {
  await setReview(review);
});

export const getReviews = createAsyncThunk<Review[]>(
  'collections/getReviews',
  () =>
    new Promise((resolve, reject) => {
      firestore()
        .collection('reviews')
        .onSnapshot(
          snap => {
            resolve(
              snap.docs.map(doc => ({
                id: doc.id,
                book: convertToBook(doc.data().book),
                createdBy: doc.data().createdBy,
                createdDate: doc.data().createdDate,
                reviewTitle: doc.data().reviewTitle,
                reviewDescription: doc.data().reviewDescription,
                rating: doc.data().rating,
              })),
            );
          },
          error => {
            reject(error);
          },
        );
    }),
);
