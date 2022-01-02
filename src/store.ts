import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import userSlice from './redux/user/userSlice';
import {booksApi} from './services/books';

const store = configureStore({
  reducer: {[booksApi.reducerPath]: booksApi.reducer, user: userSlice},
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(booksApi.middleware),
});

setupListeners(store.dispatch);
export default store;
