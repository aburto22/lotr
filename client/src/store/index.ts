import { configureStore } from '@reduxjs/toolkit';
import lotrReducer from '../slices';
import { readFromLocalStore, saveToLocalStorage } from '../services/favourites';

const store = configureStore({
  reducer: {
    lotr: lotrReducer,
  },
  preloadedState: {
    lotr: {
      quotes: [],
      characters: [],
      favourites: readFromLocalStore(),
    },
  },
});

store.subscribe(() => saveToLocalStorage(store.getState().lotr.favourites));

export default store;

export type IRootStore = ReturnType<typeof store.getState>;

export type IAppDispatch = typeof store.dispatch;
