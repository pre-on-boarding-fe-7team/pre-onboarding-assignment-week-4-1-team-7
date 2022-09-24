import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiservice } from '..';
import { createExtraReducers, reducerUtils } from '../common/utils/async.utill';

const fetchAccount = createAsyncThunk(
  'accountSlice/fetchAccount',
  async params => await apiservice.getAccountApi(params)
);

const updateAccount = createAsyncThunk(
  'accountSlice/updateAccount',
  async params => await apiservice.updateAccountsApi(params)
);

const accountSlice = createSlice({
  name: 'account',
  initialState: reducerUtils.initial(),
  extraReducers: builder => {
    createExtraReducers(fetchAccount)(builder);
    createExtraReducers(updateAccount)(builder);
  },
});

export { fetchAccount, updateAccount };
export default accountSlice.reducer;
