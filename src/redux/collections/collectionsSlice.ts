import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Book, CollectionsState, Review} from 'src/models';
import {getFavorite, setFavorite, getReviews, setReviews} from './collectionsActions';

const initialState: CollectionsState = {
  favorite: [],
  reviews: [],
  error: '',
  loading: false,
};

const CollectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(setFavorite.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(setFavorite.fulfilled, state => {
        state.loading = false;
      })
      .addCase(setFavorite.rejected, (state, action) => {
        state.error = action.error.message ?? 'error';
        state.loading = false;
      })

      .addCase(getFavorite.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(getFavorite.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.favorite = action.payload;
        state.loading = false;
      })
      .addCase(getFavorite.rejected, (state, action) => {
        state.error = action.error.message ?? 'error';
        state.loading = false;
      })
      .addCase(setReviews.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(setReviews.fulfilled, state => {
        state.loading = false;
      })
      .addCase(setReviews.rejected, (state, action) => {
        state.error = action.error.message ?? 'error';
        state.loading = false;
      })
      .addCase(getReviews.pending, state => {
        state.error = '';
        state.loading = true;
      })
      .addCase(getReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.reviews = action.payload;
        state.loading = false;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.error = action.error.message ?? 'error';
        state.loading = false;
      });
  },
});

export default CollectionsSlice.reducer;
export const collectionsSelector = (state: {collections: CollectionsState}) => state.collections;
