import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IQuoteName } from '../types';

const initialState: IQuoteName[] = [];

const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFavourite: (state, action: PayloadAction<IQuoteName>) => {
      const index = state.findIndex((q) => q.id === action.payload.id);
      if (index < 0) {
        return [...state, action.payload];
      }
      return state.filter((q) => q.id !== action.payload.id);
    },
  },
});

export default favouriteSlice.reducer;

export const { toggleFavourite } = favouriteSlice.actions;
