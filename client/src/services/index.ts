const host = process.env.NODE_ENV === 'development' ? 'http://localhost:5500': '';

export const fetchFromApi = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${host}/api/lotr${path}`);
  const data = await response.json();
  return data;
}
