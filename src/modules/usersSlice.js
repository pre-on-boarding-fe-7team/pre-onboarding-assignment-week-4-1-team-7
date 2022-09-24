import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiservice } from '..';
import { reducerUtils } from '../common/utils/asyncUtils';
// import { createExtraReducers } from '../common/utils/async.utill';

//action Fn
export const getUsersThunk = createAsyncThunk(
  'usersSlice/getUsersThunk',
  async (page, limit) => await apiservice.getUsersApi({ page, limit })
);

// export const getUserDetailThunk = createAsyncThunk(
//   'usersSlice/getUserDetailThunk',
//   async userId => await apiservice.getUserDetailApi(userId)
// );

export const searchUsersThunk = createAsyncThunk(
  'userSlice/searchUsersFetch',
  async (query, page, limit) => {
    await apiservice.searchUsersApi(query, page, limit);
  }
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
    [searchUsersThunk.fulfilled]: (state, action) => {
      state.data = action.payload.data;
      state.total = action.payload.total;
    },
    [getUsersThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // [getUserDetailThunk.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [getUserDetailThunk.fulfilled]: (state, action) => {
    //   state.user = action.payload.data;
    // },
    // [getUserDetailThunk.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.error;
    // },
  },
});
// //slice
// const usersSlice = createSlice({
//   name: 'users',
//   initialState: reducerUtils.initial(),
//   extraReducers: createExtraReducers(getUsersThunk, getUserDetailThunk, searchUsersThunk),
// });

export default usersSlice.reducer;
