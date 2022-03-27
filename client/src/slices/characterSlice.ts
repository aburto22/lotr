import { createSlice } from '@reduxjs/toolkit';
import { ICharacter } from '../types';

const initialState: ICharacter[] = [];

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
});

export default characterSlice.reducer;
