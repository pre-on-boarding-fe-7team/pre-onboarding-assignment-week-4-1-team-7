import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAccountsApi } from '../api/api';

export const getAccountFetch = createAsyncThunk('userSlice/getAccountFetch', async () => {
  return await getAccountsApi();
});

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    account: [],
    status: 'Loading',
  },
  extraReducers: builder => {
    builder.addCase(getAccountFetch.pending, (state, action) => {
      state.status = 'Loading';
    });
    builder.addCase(getAccountFetch.fulfilled, (state, action) => {
      state.account = action.payload;
      state.status = 'Success';
    });
    builder.addCase(getAccountFetch.rejected, (state, action) => {
      state.status = 'Fail';
    });
  },
});

export default userSlice.reducer;
