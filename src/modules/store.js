import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';

export const store = configureStore({
  reducer: { usersReducer },
  devTools: process.env.NODE_ENV !== 'production',
});
