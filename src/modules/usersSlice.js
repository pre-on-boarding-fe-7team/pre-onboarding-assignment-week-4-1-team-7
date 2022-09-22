import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAccounts, getUsers, getUserSettings, searchUsersList } from '../api/api';
import { API_STATUS } from '../common/utils/constant';
import { convertDate, maskingName, maskingPhonNumber } from '../common/utils/utils';

export const fetchUsersList = createAsyncThunk('users/getUsersList', async () => {
  try {
    const [users, accounts, userSettings] = await Promise.allSettled([
      getUsers(),
      getAccounts(),
      getUserSettings(),
    ]);
    users.value.data.pop();
    const userOwnAccountNum = Array.from({ length: 100 }, () => 0);
    for (const value of accounts.value.data) {
      userOwnAccountNum[value.user_id - 1] += 1;
    }

    const userList = users.value.data.map((user, idx) => {
      return {
        ...user,
        name: maskingName(user.name),
        birth_date: convertDate(user.birth_date),
        phone_number: maskingPhonNumber(user.phone_number),
        last_login: convertDate(user.last_login),
        created_at: convertDate(user.created_at),
        userOwnAccountNum: userOwnAccountNum[idx],
        allow_marketing_push: userSettings.value.data[idx].allow_marketing_push,
        is_active: userSettings.value.data[idx].is_active,
        is_staff: userSettings.value.data[idx].is_staff,
      };
    });

    return userList;
  } catch (e) {
    throw new Error(e);
  }
});

export const fetchSearchUsersList = createAsyncThunk('users/searchUsersList', async name => {
  try {
    console.info('name: ', name);
    const result = await searchUsersList(name);
    console.info(result);
    return result.data;
  } catch (e) {
    throw new Error(e);
  }
});

const initialState = {
  users: [],
  searchedUsers: [],
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
    builder.addCase(fetchSearchUsersList.pending, (state, action) => {
      state.status = API_STATUS.LOADING;
    });
    builder.addCase(fetchSearchUsersList.fulfilled, (state, action) => {
      state.searchedUsers = action.payload;
      state.status = API_STATUS.SUCCESS;
    });
    builder.addCase(fetchSearchUsersList.rejected, (state, action) => {
      state.status = API_STATUS.FAILED;
    });
  },
});

export default usersSlice.reducer;
