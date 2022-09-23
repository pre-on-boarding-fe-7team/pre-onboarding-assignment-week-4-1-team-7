import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import accountsSlice from './accountsSlice';
import usersSlice from './usersSlice';

const logger = createLogger();

// const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk))); 아래 내용과 같다.
const store = configureStore({
  reducer: {
    users: usersSlice,
    accounts: accountsSlice,
    // 애초에 slice를 users.reducer로 export default하면 그냥 reducer 모양으로 받아서 넣을 수 있음
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});

export default store;
