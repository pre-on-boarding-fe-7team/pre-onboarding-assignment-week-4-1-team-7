import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiservice } from '..';
//index에서 생성한 인스턴스를 export해오고 여기서 import로 가져온다

const getUsersFetch = createAsyncThunk('userSlice/getUsersFetch', async () => {
  return await apiservice.getUsersApi();
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
