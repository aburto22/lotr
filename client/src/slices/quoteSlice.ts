import { createSlice } from '@reduxjs/toolkit';
import { IQuoteName } from '../types';

const initialState: IQuoteName[] = [];

const quoteSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {},
});

export default quoteSlice.reducer;
