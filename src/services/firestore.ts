import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Book} from 'src/models';

export const setData = async (book: Book, name: string) => {
  const {volumeInfo, id} = book;
  const imagePath = volumeInfo?.imageLinks?.thumbnail ?? '';
  const db = firestore();
  const userId = auth().currentUser?.uid;

  if (!userId) {
    return null;
  }

  const docRef = db.collection('users').doc(userId).collection(name).doc(id.toString());
  const doc = await docRef.get();

  if (doc.exists) {
    docRef.delete();
  }
  if (!doc.exists) {
    docRef.set({
      imagePath,
    });
  }
};

export const setCover = (imagePath: string, userId: string) => {
  const db = firestore();
  db.collection('users').doc(userId).set({imagePath});
};
