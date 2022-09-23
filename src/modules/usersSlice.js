import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAccounts, getUsers, getUserSettings, searchUsersList } from '../api/api';
import { API_STATUS, ACTIVE_TYPE, FILTERING_TYPE } from '../common/utils/constant';
import { convertDate, maskingName, maskingPhonNumber } from '../common/utils/utils';

export const fetchUsersList = createAsyncThunk('users/getUsersList', async () => {
  try {
    const [users, accounts, userSettings] = await Promise.allSettled([
      getUsers(),
      getAccounts(),
      getUserSettings(),
    ]);
    users.value.data = users.value.data.slice(0, 100);
    console.info(users.value.data);
    const userOwnAccountNum = Array.from({ length: users.value.data.length }, () => 0);
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
        allow_marketing_push: userSettings.value.data[idx].allow_marketing_push
          ? ACTIVE_TYPE.ALLOW_MARKETING_PUSH
          : ACTIVE_TYPE.NONE_ALLOW_MARKETING_PUSH,
        is_active: userSettings.value.data[idx].is_active
          ? ACTIVE_TYPE.ACTIVE
          : ACTIVE_TYPE.NONE_ACTIVE,
        is_staff: userSettings.value.data[idx].is_staff
          ? ACTIVE_TYPE.STAFF
          : ACTIVE_TYPE.NONE_STAFF,
      };
    });

    return userList;
  } catch (e) {
    throw new Error(e);
  }
});

export const fetchSearchUsersList = createAsyncThunk('users/searchUsersList', async name => {
  try {
    const [users, accounts, userSettings] = await Promise.allSettled([
      searchUsersList(name),
      getAccounts(),
      getUserSettings(),
    ]);
    users.value.data.pop();
    const userOwnAccountNum = Array.from({ length: users.value.data.length }, () => 0);
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
        allow_marketing_push: userSettings.value.data[idx].allow_marketing_push
          ? ACTIVE_TYPE.ALLOW_MARKETING_PUSH
          : ACTIVE_TYPE.NONE_ALLOW_MARKETING_PUSH,
        is_active: userSettings.value.data[idx].is_active
          ? ACTIVE_TYPE.ACTIVE
          : ACTIVE_TYPE.NONE_ACTIVE,
        is_staff: userSettings.value.data[idx].is_staff
          ? ACTIVE_TYPE.STAFF
          : ACTIVE_TYPE.NONE_STAFF,
      };
    });
    return userList;
  } catch (e) {
    throw new Error(e);
  }
});

const initialState = {
  users: [],
  filteredUsers: [],
  status: API_STATUS.LOADING,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    noFilteringUsers: state => {
      state.filteredUsers = state.users;
    },
    activeFilteringUsers: state => {
      state.filteredUsers = state.users.filter(user => user.is_active === FILTERING_TYPE.ACTIVE);
    },
    noneActiveFilteringUsers: state => {
      state.filteredUsers = state.users.filter(
        user => user.is_active === FILTERING_TYPE.NONE_ACTIVE
      );
    },
    staffFilteringUsers: state => {
      state.filteredUsers = state.users.filter(user => user.is_staff === FILTERING_TYPE.STAFF);
    },
    noneStaffFilteringUsers: state => {
      state.filteredUsers = state.users.filter(user => user.is_staff === FILTERING_TYPE.NONE_STAFF);
    },
  },
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
      state.status = API_STATUS.SERACH_LOADING;
    });
    builder.addCase(fetchSearchUsersList.fulfilled, (state, action) => {
      state.users = action.payload;
      state.status = API_STATUS.SUCCESS;
    });
    builder.addCase(fetchSearchUsersList.rejected, (state, action) => {
      state.status = API_STATUS.FAILED;
    });
  },
});

export const {
  noFilteringUsers,
  activeFilteringUsers,
  noneActiveFilteringUsers,
  staffFilteringUsers,
  noneStaffFilteringUsers,
} = usersSlice.actions;
export default usersSlice.reducer;
