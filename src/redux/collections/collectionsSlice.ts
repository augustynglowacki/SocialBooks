import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Book, CollectionsState} from 'src/models';
import {getFavorite, setFavorite} from './collectionsActions';

const initialState: CollectionsState = {
  favorite: [],
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
      });
  },
});

export default CollectionsSlice.reducer;
export const collectionsSelector = (state: {collections: CollectionsState}) => state.collections;
