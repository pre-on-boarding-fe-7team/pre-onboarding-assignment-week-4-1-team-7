import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAccounts } from '../api/api';

const getAccountFetch = createAsyncThunk('accountSlice/getAccountFetch', async () => {
  return await getAccounts();
});

const accountSlice = createSlice({
  name: 'accountReducer',
  initialState: [],
  reducers: {
    getAll: (state, action) => {
      state.value = getAccountFetch();
    },
    // add: (state, action) => {
    //   state.push({ text: action.payload, id: Date.now() });
    // },
    // remove: (state, action) => state.filter(toDo => toDo.id !== action.payload),
  },
});

export default accountSlice;
export { getAccountFetch };
// export const { getAll } = accountSlice.actions;
// export default configureStore({ reducer: accountSlice.reducer });
