import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiservice } from '..';
import { createExtraReducers, reducerUtils } from '../common/utils/async.utill';

export const getUserDetailThunk = createAsyncThunk(
  'userDetailSlice/getUserDetailThunk',
  async userId => await apiservice.getUserDetailApi(userId)
);

//slice
const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState: reducerUtils.initial(),
  extraReducers: createExtraReducers(getUserDetailThunk),
});

export default userDetailSlice.reducer;
