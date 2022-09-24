import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiservice } from '..';
import { createExtraReducers, reducerUtils } from '../common/utils/async.utill';
import { PAGE_LIMIT } from '../common/utils/constant';

const fetchAccounts = createAsyncThunk(
  'accountsSlice/fetchAccounts',
  async params => await apiservice.getAccountsApi({ _page: 1, _limit: PAGE_LIMIT, ...params })
);

const accountsSlice = createSlice({
  name: 'accounts',
  initialState: reducerUtils.initial(),
  extraReducers: createExtraReducers(fetchAccounts),
});

export { fetchAccounts };
export default accountsSlice.reducer;
