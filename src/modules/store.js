import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import accountsSlice from './accountsSlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: { accounts: accountsSlice.reducer, users: userSlice },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;
