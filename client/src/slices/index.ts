import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { checkFavourite } from '../services/favourites';
import { ICharacter, IQuote } from '../types';
import { fetchFromApi } from '../services/api';

interface IState {
  characters: ICharacter[];
  quotes: IQuote[],
  favourites: IQuote[],
}

const initialState: IState = {
  characters: [],
  quotes: [],
  favourites: [],
};

export const fetchInfoThunk = createAsyncThunk('lotr/fetchInfo', async () => fetchFromApi('/'));

const toggleQuoteById = (quotes: IQuote[], id: string): IQuote[] => quotes.map((q) => {
  if (id === q.id) {
    return { ...q, isFavourite: !q.isFavourite };
  }
  return q;
});

const getFavourites = (quotes: IQuote[]): IQuote[] => quotes.filter((q) => q.isFavourite);

const lotrSlice = createSlice({
  name: 'lotr',
  initialState,
  reducers: {
    toggleFavourite: (state, action: PayloadAction<string>) => {
      const newQuotes = toggleQuoteById(state.quotes, action.payload);
      const newFavourites = getFavourites(newQuotes);

      return {
        ...state,
        quotes: newQuotes,
        favourites: newFavourites,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfoThunk.fulfilled, (state, action) => {
        const quoteFavourites = action.payload.quotes.map((q) => (
          checkFavourite(q, state.favourites)
        ));

        return {
          ...state,
          characters: action.payload.characters,
          quotes: quoteFavourites,
        };
      });
  },
});

export default lotrSlice.reducer;

export const { toggleFavourite } = lotrSlice.actions;
