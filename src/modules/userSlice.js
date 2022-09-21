import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsersApi } from '../api/api';

const getUsersFetch = createAsyncThunk('userSlice/getUsersFetch', async () => {
  return await getUsersApi();
});

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    users: null,
    user: null,
    status: 'Hello',
  },
  extraReducers: builder => {
    builder.addCase(getUsersFetch.pending, (state, action) => {
      state.status = 'Loading';
    });
    builder.addCase(getUsersFetch.fulfilled, (state, action) => {
      state.users = action.payload;
      // state.status = 'complete';
    });
    builder.addCase(getUsersFetch.rejected, (state, action) => {
      state.status = 'Fail';
    });
  },
});

export default userSlice;
export { getUsersFetch };
