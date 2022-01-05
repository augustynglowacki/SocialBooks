import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {booksApi} from '../services/books';
import rootReducer, {RootState} from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(booksApi.middleware),
});

//Whenever we use a thunk for API calls/async logic, it’s type will be AppThunk.
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
//Whenever we use dispatch, it’s type will be AppDispatch,
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
export default store;
