import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../api/api';
import { API_STATUS } from '../../common/utils/constant';

export const fetchUsersList = createAsyncThunk('users/getUsersList', async () => {
  const response = await getUsers();
  return response.data;
});

const initialState = {
  users: [],
  status: API_STATUS.LOADING,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchUsersList.pending, (state, action) => {
      state.status = API_STATUS.LOADING;
    });
    builder.addCase(fetchUsersList.fulfilled, (state, action) => {
      state.users = action.payload;
      state.status = API_STATUS.SUCCESS;
    });
    builder.addCase(fetchUsersList.rejected, (state, action) => {
      state.status = API_STATUS.FAILED;
    });
  },
});

// Action creators are generated for each case reducer function
// export const {} = usersSlice.actions;

export default usersSlice.reducer;
