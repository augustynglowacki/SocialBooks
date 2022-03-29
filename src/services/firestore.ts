import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Book, Challenge, Review} from 'src/models';

export const setData = async (data: Book) => {
  const {volumeInfo, id} = data;
  const title = volumeInfo?.title ?? '';
  const description = volumeInfo?.description ?? '';
  const averageRating = volumeInfo?.averageRating ?? 0;
  const ratingCount = volumeInfo?.ratingCount ?? 0;
  const authors = volumeInfo?.authors ?? [];
  const imagePath = volumeInfo?.imageLinks?.thumbnail ?? '';
  const db = firestore();
  const userId = auth().currentUser?.uid;
  const createdBy = userId ?? '';

  if (!userId) {
    return null;
  }

  const globalDocRef = db.collection('favorite').doc(userId + id);
  const globalDoc = await globalDocRef.get();

  if (globalDoc.exists) {
    globalDocRef.delete();
  }
  if (!globalDoc.exists) {
    globalDocRef.set({
      id: userId + id,
      book: {
        id,
        volumeInfo: {
          title,
          description,
          averageRating,
          ratingCount,
          authors,
          imagePath,
        },
      },
      createdBy,
      createdDate: new Date().toISOString(),
    });
  }
};

export const setUserData = async () => {
  const db = firestore();
  const userId = auth().currentUser?.uid;
  const displayName = auth().currentUser?.displayName;
  if (!userId) {
    return null;
  }

  const docRef = db.collection('userData').doc(userId);
  const doc = await docRef.get();

  if (doc.exists) {
    docRef.delete();
  }
  if (!doc.exists) {
    docRef.set({userId, displayName});
  }
};

export const setFollowing = async (id: string) => {
  const db = firestore();
  const userId = auth().currentUser?.uid;
  if (!userId) {
    return null;
  }

  const docRef = db.collection('users').doc(userId).collection('following').doc(id);
  const doc = await docRef.get();

  if (doc.exists) {
    docRef.delete();
  }
  if (!doc.exists) {
    docRef.set({id});
  }
};

export const setReview = async (review: Review) => {
  const {
    book: {volumeInfo, id: bookId},
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
  const thumbnail = volumeInfo?.imageLinks?.thumbnail ?? '';

  if (!userId) {
    return null;
  }

  const globalDocRef = db.collection('reviews').doc(id);
  const globalDoc = await globalDocRef.get();

  if (globalDoc.exists) {
    globalDocRef.delete();
  }
  if (!globalDoc.exists) {
    globalDocRef.set({
      id,
      book: {
        id: bookId,
        volumeInfo: {
          title,
          description,
          averageRating,
          ratingCount,
          authors,
          imageLinks: {
            thumbnail,
          },
        },
      },
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

export const setChallenges = async (challenge: Challenge) => {
  const db = firestore();
  const userId = auth().currentUser?.uid;

  const createdBy = userId ?? '';
  const challengeDescription = challenge.challengeDescription ?? '';
  const challengeTitle = challenge.challengeTitle ?? '';
  const challengeDeadline = challenge.challengeDeadline ?? new Date().toISOString();
  const comments = challenge.comments ?? [];
  const completed = challenge.completed ?? [];
  const takingPart = challenge.takingPart ?? [];
  const id = createdBy + challengeTitle + challengeDeadline;
  if (!userId) {
    return null;
  }

  const globalDocRef = db.collection('challenges').doc(id);
  const globalDoc = await globalDocRef.get();

  if (globalDoc.exists) {
    globalDocRef.delete();
  }
  if (!globalDoc.exists) {
    globalDocRef.set({
      id,
      createdBy,
      challengeDeadline,
      challengeDescription,
      challengeTitle,
      takingPart,
      comments,
      completed,
    });
  }
};

export const takePartInChallenge = async (challenge: Challenge) => {
  const db = firestore();
  const userId = auth().currentUser?.uid;

  const createdBy = challenge.createdBy;
  const challengeDescription = challenge.challengeDescription ?? '';
  const challengeTitle = challenge.challengeTitle ?? '';
  const challengeDeadline = challenge.challengeDeadline ?? new Date().toISOString();
  const comments = challenge.comments ?? [];
  const completed = challenge.completed ?? [];
  const takingPart = challenge.takingPart ?? [];
  const id = challenge.id;
  if (!userId) {
    return null;
  }

  const globalDocRef = db.collection('challenges').doc(id);
  const globalDoc = await globalDocRef.get();

  if (takingPart.includes(userId)) {
    globalDocRef.set({
      id,
      createdBy,
      challengeDeadline,
      challengeDescription,
      challengeTitle,
      takingPart: takingPart.filter(id => id !== userId),
      comments,
      completed,
    });
  }
  if (!takingPart.includes(userId)) {
    globalDocRef.set({
      id,
      createdBy,
      challengeDeadline,
      challengeDescription,
      challengeTitle,
      takingPart: [...takingPart, userId],
      comments,
      completed,
    });
  }
};
export const completeChallenge = async (challenge: Challenge) => {
  const db = firestore();
  const userId = auth().currentUser?.uid;
  const createdBy = challenge.createdBy;
  const challengeDescription = challenge.challengeDescription ?? '';
  const challengeTitle = challenge.challengeTitle ?? '';
  const challengeDeadline = challenge.challengeDeadline ?? new Date().toISOString();
  const comments = challenge.comments ?? [];
  const takingPart = challenge.takingPart ?? [];
  const completed = challenge.completed ?? [];
  const id = challenge.id;
  if (!userId) {
    return null;
  }

  const globalDocRef = db.collection('challenges').doc(id);

  if (completed.includes(userId)) {
    globalDocRef.set({
      id,
      createdBy,
      challengeDeadline,
      challengeDescription,
      challengeTitle,
      takingPart,
      comments,
      completed: completed.filter(id => id !== userId),
    });
  }
  if (!completed.includes(userId)) {
    globalDocRef.set({
      id,
      createdBy,
      challengeDeadline,
      challengeDescription,
      challengeTitle,
      takingPart,
      comments,
      completed: [...completed, userId],
    });
  }
};
