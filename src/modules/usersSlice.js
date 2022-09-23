import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/api';
import { reducerUtils } from '../common/utils/asyncUtils';

//action Fn
export const getUsersThunk = createAsyncThunk(
  'usersSlice/getUsersThunk',
  async () => await getUsers()
);

//slice
const usersSlice = createSlice({
  name: 'users',
  initialState: reducerUtils.initial(),
  reducers: {},
  extraReducers: {
    [getUsersThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [getUsersThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getUsersThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default usersSlice.reducer;
