import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiservice } from '..';

const getUserSettingFetch = createAsyncThunk('userSettingSlice/getUserSettingFetch', async () => {
  return await apiservice.getSettingApi();
});

const userSettingSlice = createSlice({
  name: 'userSettingSlice',
  initialState: {
    setting: null,
    status: 'Loading',
  },
  extraReducers: builder => {
    builder.addCase(getUserSettingFetch.pending, (state, action) => {
      state.status = 'Loading';
    });
    builder.addCase(getUserSettingFetch.fulfilled, (state, action) => {
      state.setting = action.payload;
      // state.status = 'Complete';
    });
    builder.addCase(getUserSettingFetch.rejected, (state, action) => {
      state.status = 'Fail';
    });
  },
});

export default userSettingSlice;
export { getUserSettingFetch };
