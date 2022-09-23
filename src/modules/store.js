import { configureStore } from '@reduxjs/toolkit';
import userSettingSlice from './userSettingSlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    setting: userSettingSlice.reducer,
  },
});

export default store;
