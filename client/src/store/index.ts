import { configureStore } from '@reduxjs/toolkit';
import quoteReducer from '../slices/quoteSlice';
import favouriteReducer from '../slices/favouriteSlice';
import characterReducer from '../slices/characterSlice';
import { readFromLocalStore, saveToLocalStorage } from '../services/favourites';

const store = configureStore({
  reducer: {
    quotes: quoteReducer,
    favourites: favouriteReducer,
    characters: characterReducer,
  },
  preloadedState: {
    quotes: [],
    characters: [],
    favourites: readFromLocalStore(),
  },
});

store.subscribe(() => saveToLocalStorage(store.getState().favourites));

export default store;

export type IRootStore = ReturnType<typeof store.getState>;

export type IAppDispatch = typeof store.dispatch;
