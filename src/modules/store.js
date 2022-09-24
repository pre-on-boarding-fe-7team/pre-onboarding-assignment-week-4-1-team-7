import { configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD
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
=======
import logger from 'redux-logger';
import accountsSlice from './accountsSlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: { accounts: accountsSlice.reducer, users: userSlice },
>>>>>>> CSJ
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;
