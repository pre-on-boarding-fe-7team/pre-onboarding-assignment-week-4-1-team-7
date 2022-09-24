import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiservice } from '..';
import { createExtraReducers, reducerUtils } from '../common/utils/async.utill';
import { PAGE_LIMIT } from '../common/utils/constant';
import { useParams } from 'react-router-dom';

const fetchAccounts = createAsyncThunk(
  'accountsSlice/fetchAccounts',
  async params => await apiservice.getAccountsApi({ _page: 1, _limit: PAGE_LIMIT, ...params })
);
const getAccountFetch = createAsyncThunk('accountsSlice/getAccountFetch', async () => {
  let { id } = useParams();
  return await apiservice.getAccountsallApi(id);
});

const accountsSlice = createSlice({
  name: 'accounts',
  initialState: reducerUtils.initial(),
  extraReducers: createExtraReducers(fetchAccounts, getAccountFetch),
});

export { fetchAccounts, getAccountFetch };
export default accountsSlice.reducer;
