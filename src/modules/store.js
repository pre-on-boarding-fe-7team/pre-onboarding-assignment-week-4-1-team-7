import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userSlice from './userSlice';
import accountSlice from './accountSlice';
const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    assert: accountSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;
