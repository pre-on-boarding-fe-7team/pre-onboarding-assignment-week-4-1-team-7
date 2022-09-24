import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiservice } from '..';
import { reducerUtils } from '../common/utils/asyncUtils';

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
  initialState: reducerUtils.initial(),
  extraReducers: {
    [getUsersThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [getUsersThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.total = action.payload.total;
    },
    [getUsersThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [searchUsersThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [searchUsersThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.total = action.payload.total;
    },
    [searchUsersThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getAllUsersThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllUsersThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.total = action.payload.total;
    },
    [getAllUsersThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default usersSlice.reducer;
