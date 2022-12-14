import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import accountSlice from './accountSlice';
import accountsSlice from './accountsSlice';
import userDetailSlice from './userDetailSlice';
import userSettingSlice from './userSettingSlice';
import usersSlice from './usersSlice';

const logger = createLogger();

const store = configureStore({
  reducer: {
    user: userDetailSlice,
    users: usersSlice,
    userSetting: userSettingSlice,
    accounts: accountsSlice,
    account: accountSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;
