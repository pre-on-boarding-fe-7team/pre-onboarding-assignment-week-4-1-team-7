import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiservice } from '..';
import { createExtraReducers, reducerUtils } from '../common/utils/async.utill';
import { PAGE_LIMIT } from '../common/utils/constant';

const fetchAccounts = createAsyncThunk(
  'accountsSlice/fetchAccounts',
  async params => await apiservice.getAccountsApi({ _page: 1, _limit: PAGE_LIMIT, ...params })
);

const getUserAccountThunk = createAsyncThunk(
  'accountsSlice/fetchAccountsByUser',
  async userId => await apiservice.getAccountsApi({ user_id: userId })
);

const accountsSlice = createSlice({
  name: 'accounts',
  initialState: reducerUtils.initial(),
  extraReducers: builder => {
    createExtraReducers(fetchAccounts)(builder);
    createExtraReducers(getUserAccountThunk)(builder);
  },
});

export { fetchAccounts, getUserAccountThunk };
export default accountsSlice.reducer;
