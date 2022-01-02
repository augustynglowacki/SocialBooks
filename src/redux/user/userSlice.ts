import {createSlice} from '@reduxjs/toolkit';
import {UserState} from 'src/models/user';
import {createUserWithEmailAndPassword, logOutUser, signInWithEmailAndPassword} from 'src/redux/user/userActions';

const initialState: UserState = {
  loading: false,
  error: '',
  user: {id: '', email: '', userName: '', photoURL: ''},
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
          const [, errorMessage] = action.error.message.split(']');
          state.error = errorMessage;
        }
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
          const [, errorMessage] = action.error.message.split(']');
          state.error = errorMessage;
        }
      });
  },
});

export const {setActiveUser, setErrorNull} = userSlice.actions;
export const userSelector = (state: {user: UserState}) => state.user;
export default userSlice.reducer;
