import {createAsyncThunk} from '@reduxjs/toolkit';
import {Book, Review} from 'src/models';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {setData, setReview} from 'src/services/firestore';

export const setFavorite = createAsyncThunk<void, Book>('collections/setFavorite', async book => {
  await setData(book, 'favorite');
});

export const getFavorite = createAsyncThunk<Book[]>(
  'collections/getFavorite',
  () =>
    new Promise((resolve, reject) => {
      const userId = auth().currentUser?.uid ?? 'none';
      firestore()
        .collection('users')
        .doc(userId)
        .collection('favorite')
        .onSnapshot(
          snap => {
            resolve(
              snap.docs.map(doc => ({
                id: doc.id,
                volumeInfo: {
                  title: doc.data().title,
                  description: doc.data().description,
                  authors: doc.data().authors,
                  averageRating: doc.data().averageRating,
                  ratingCount: doc.data().ratingCount,
                  imageLinks: {
                    thumbnail: doc.data().imagePath,
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
                id: doc.data().id,
                book: doc.data().book,
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
