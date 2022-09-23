import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import accountsSlice from './accountsSlice';
import userSettingSlice from './userSettingSlice';
import usersSlice from './usersSlice';

const logger = createLogger();

const store = configureStore({
  reducer: {
    users: usersSlice,
    userSetting: userSettingSlice,
    accounts: accountsSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;
