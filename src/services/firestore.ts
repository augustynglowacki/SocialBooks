import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Book} from 'src/models';

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
