import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiservice } from '..';
import { createExtraReducers, reducerUtils } from '../common/utils/async.utill';

export const getUserAccountThunk = createAsyncThunk(
  'userAccountsSlice/fetchAccounts',
  async userId => await apiservice.getAccountsApi({ user_id: userId })
);

const userAccountsSlice = createSlice({
  name: 'userAccounts',
  initialState: reducerUtils.initial(),
  extraReducers: createExtraReducers(getUserAccountThunk),
});

export default userAccountsSlice.reducer;
