import { ICharacter, IQuote } from '../types';

const host = process.env.NODE_ENV === 'development' ? 'http://localhost:5500' : '';

interface IFetchData {
  characters: ICharacter[];
  quotes: IQuote[];
}

export const fetchFromApi = async (path: string): Promise<IFetchData> => {
  const response = await fetch(`${host}/api/lotr${path}`);
  return response.json();
};

export const fetchPostFromApi = async <T>(path: string, data: any): Promise<T> => {
  const response = await fetch(`${host}/api/lotr${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
