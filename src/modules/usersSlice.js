import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsersApi } from '../api/api';
import { reducerUtils } from '../common/utils/asyncUtils';

//action Fn
export const getUsersThunk = createAsyncThunk(
  'usersSlice/getUsersThunk',
  async (page, limit) => await getUsersApi(page, limit)
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
  },
});

export default usersSlice.reducer;
