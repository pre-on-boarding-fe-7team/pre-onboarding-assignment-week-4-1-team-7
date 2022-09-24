import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiservice } from '..';
import { createExtraUsersReducers, UsersReducerUtils } from '../common/utils/async.utill';

//action Fn
export const getUsersThunk = createAsyncThunk(
  'usersSlice/getUsersThunk',
  async (page, limit) => await apiservice.getUsersApi({ _page: page, _limit: limit })
);
export const getAllUsersThunk = createAsyncThunk(
  'usersSlice/getAllUsersThunk',
  async params => await apiservice.getUsersApi(params)
);

export const searchUsersThunk = createAsyncThunk(
  'usersSlice/searchUsersThunk',
  async (query, page, limit) =>
    await apiservice.searchUsersApi({ q: query, _page: page, _limit: limit })
);
//slice
const usersSlice = createSlice({
  name: 'users',
  initialState: UsersReducerUtils.initial(),
  extraReducers: builder => {
    createExtraUsersReducers(getUsersThunk)(builder);
    createExtraUsersReducers(getAllUsersThunk)(builder);
    createExtraUsersReducers(searchUsersThunk)(builder);
  },
});

export default usersSlice.reducer;
