import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserData, UserState} from 'src/models/user';
import {
  createUserWithEmailAndPassword,
  getUserData,
  logOutUser,
  signInWithEmailAndPassword,
} from 'src/redux/user/userActions';

const initialState: UserState = {
  loading: false,
  error: '',
  user: {id: '', email: '', userName: ''},
  allUsers: [] as UserData[],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.user = action.payload;
    },
    setErrorNull: state => {
      state.error = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signInWithEmailAndPassword.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signInWithEmailAndPassword.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(signInWithEmailAndPassword.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message) {
          const [, errorMessage] = action.error.message.split('] ');
          state.error = errorMessage;
        }
      })
      .addCase(getUserData.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(getUserData.fulfilled, (state, action: PayloadAction<UserData[]>) => {
        state.allUsers = action.payload;
        state.loading = false;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.error = action.error.message ?? 'error';
        state.loading = false;
      })
      .addCase(logOutUser.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(logOutUser.fulfilled, state => {
        state.user.email = '';
        state.user.userName = '';
        state.loading = false;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message) {
          const [, errorMessage] = action.error.message.split(']');
          state.error = errorMessage;
        }
      })
      .addCase(createUserWithEmailAndPassword.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(createUserWithEmailAndPassword.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(createUserWithEmailAndPassword.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message) {
          const [, errorMessage] = action.error.message.split('] ');
          state.error = errorMessage;
        }
      });
  },
});

export const {setActiveUser, setErrorNull} = userSlice.actions;
export const userSelector = (state: {user: UserState}) => state.user;
export default userSlice.reducer;
