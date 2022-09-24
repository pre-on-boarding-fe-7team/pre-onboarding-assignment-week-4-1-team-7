import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiservice } from '..';
import { createExtraReducers, reducerUtils } from '../common/utils/async.utill';

export const getUserSettingThunk = createAsyncThunk(
  'userSettingSlice/getUsersSettingThunk',
  async () => await apiservice.getSettingApi()
);

const userSettingSlice = createSlice({
  name: 'usersSettingSlice',
  initialState: reducerUtils.initial(),
  extraReducers: createExtraReducers(getUserSettingThunk),
});

export default userSettingSlice.reducer;
