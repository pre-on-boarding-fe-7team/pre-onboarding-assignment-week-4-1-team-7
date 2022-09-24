<<<<<<< HEAD
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiservice } from '..';
import { reducerUtils } from '../common/utils/asyncUtils';

//action Fn
export const getAccountsThunk = createAsyncThunk(
  'accountsSlice/getAccountsThunk',
  async () => await apiservice.getAccountsApi()
);

//slice
const accountsSlice = createSlice({
  name: 'accounts',
  initialState: reducerUtils.initial(),
  extraReducers: {
    [getAccountsThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [getAccountsThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getAccountsThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default accountsSlice.reducer;
=======
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { getAccountsApi } from '../api/api';
import { createExtraReducers, reducerUtils } from '../common/utils/async.utill';
import { PAGE_LIMIT } from '../common/utils/constant';

const fetchAccounts = createAsyncThunk(
  'accountsSlice/fetchAccounts',
  async params => await getAccountsApi({ _page: 1, _limit: PAGE_LIMIT, ...params })
);

const accountsSlice = createSlice({
  name: 'accounts',
  initialState: reducerUtils.initial(),
  extraReducers: createExtraReducers(fetchAccounts),
});

const getAccounts = state => state.accounts;
const getFilterBroker = broker_id =>
  createSelector(getAccounts, accounts =>
    accounts.filter(account => account.broker_id === broker_id)
  );

export { fetchAccounts, getFilterBroker };
export default accountsSlice;
>>>>>>> CSJ
