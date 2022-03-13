import auth from '@react-native-firebase/auth';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {BackendUser, LoginUser, User, UserData} from 'src/models/user';
import firestore from '@react-native-firebase/firestore';
import {setUserData} from 'src/services/firestore';

export const getUserData = createAsyncThunk<UserData[]>(
  'auth/getUserData',
  () =>
    new Promise((resolve, reject) => {
      firestore()
        .collection('userData')
        .onSnapshot(
          snap => {
            resolve(
              snap.docs.map(doc => ({
                userId: doc.id,
                displayName: doc.data().displayName,
              })),
            );
          },
          error => {
            reject(error);
          },
        );
    }),
);

export const signInWithEmailAndPassword = createAsyncThunk<User, LoginUser>(
  'auth/signIn',
  async ({email, password}, {rejectWithValue}) => {
    const {
      user: {uid, displayName},
    } = await auth().signInWithEmailAndPassword(email, password);
    if (!uid || !displayName) {
      return rejectWithValue('Something went wrong while connecting to Firebase');
    }
    return {
      id: uid,
      email,
      userName: displayName,
      photoURL: '',
    };
  },
);

export const logOutUser = createAsyncThunk('auth/logOut', async () => auth().signOut());

export const createUserWithEmailAndPassword = createAsyncThunk<User, BackendUser>(
  'auth/register',
  async ({email, password, displayName}, {rejectWithValue}) => {
    const {user} = await auth().createUserWithEmailAndPassword(email, password);

    await user.updateProfile({
      displayName,
    });

    const displayNameFirebase = auth().currentUser?.displayName;
    const {uid} = user;

    if (!displayNameFirebase || '') {
      return rejectWithValue('Something went wrong while connecting to Firebase');
    }
    setUserData();

    return {
      id: uid,
      email,
      userName: displayNameFirebase,
      photoURL: '',
    };
  },
);
