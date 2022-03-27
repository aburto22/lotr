import { IQuoteName } from '../types';

export const checkFavourite = (quote: IQuoteName, favourites: IQuoteName[]): IQuoteName => {
  if (favourites.findIndex((q) => q.id === quote.id) >= 0) {
    return { ...quote, isFavourite: true };
  }
  return quote;
};

export const readFromLocalStore = () => {
  try {
    const saved = localStorage.getItem('lotrQuotes') || '[]';
    return JSON.parse(saved);
  } catch (err) {
    return [];
  }
};

export const saveToLocalStorage = (favourites: IQuoteName[]) => {
  localStorage.setItem('lotrQuotes', JSON.stringify(favourites));
};
