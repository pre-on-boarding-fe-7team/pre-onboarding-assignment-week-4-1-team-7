import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import accountsSlice from './accountsSlice';
import userSettingSlice from './userSettingSlice';
import usersSlice from './usersSlice';
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

export const reducers = combineReducers({
  users: usersSlice,
  userSetting: userSettingSlice,
  accounts: accountsSlice,
});

const persistConfig = {
  key: 'root',
  storage,
};

const logger = createLogger();
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;
