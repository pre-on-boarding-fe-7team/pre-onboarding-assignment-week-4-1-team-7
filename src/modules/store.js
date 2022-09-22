import { configureStore } from '@reduxjs/toolkit';
// import userSlice from './userSlice';
import accountSlice from './accoutsSlice';

const store = configureStore({
  reducer: {
    // users: userSlice.reducer,
    account: accountSlice.reducer,
  },
});

export default store;
