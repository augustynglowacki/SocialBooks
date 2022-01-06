import {createAsyncThunk} from '@reduxjs/toolkit';
import {Book} from 'src/models';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {setData} from 'src/services/firestore';

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
