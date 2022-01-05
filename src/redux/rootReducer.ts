import {combineReducers} from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import CollectionsSlice from './collections/collectionsSlice';
import {booksApi} from 'src/services/books';

// Combining multiple reducers - more will be added in the future
const rootReducer = combineReducers({
  user: userSlice,
  collections: CollectionsSlice,
  [booksApi.reducerPath]: booksApi.reducer,
});
//We declared RootState, which we’ll use in our selectors, for strongly-typed access to our Redux state.
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
