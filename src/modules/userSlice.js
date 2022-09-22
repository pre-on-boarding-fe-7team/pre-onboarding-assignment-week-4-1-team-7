import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiservice } from '..';

const getUsersFetch = createAsyncThunk('userSlice/getUsersFetch', async (page, limit) => {
  return await apiservice.getUsersApi(page, limit);
});

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    users: null,
    user: null,
    total: null,
    status: 'Loading',
  },
  extraReducers: builder => {
    builder.addCase(getUsersFetch.pending, (state, action) => {
      state.status = 'Loading';
    });
    builder.addCase(getUsersFetch.fulfilled, (state, action) => {
      state.users = action.payload.data;
      state.total = action.payload.total;
      // state.status = 'complete';
    });
    builder.addCase(getUsersFetch.rejected, (state, action) => {
      state.status = 'Fail';
    });
  },
});

export default userSlice;
export { getUsersFetch };
