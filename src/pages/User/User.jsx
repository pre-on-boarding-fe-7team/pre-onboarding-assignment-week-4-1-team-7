import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersList } from '../../features/users/usersSlice';
import { API_STATUS, FILTERING_TYPE } from '../../common/utils/constant';
import { convertDate, maskingName, maskingPhonNumber } from '../../common/utils/utils';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function User() {
  const dispatch = useDispatch();
  const { users, status } = useSelector(state => state.usersReducer);

  const [filteringType, setFilteringType] = useState(FILTERING_TYPE.NONE);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const activeFiltering = useCallback(() => {
    setFilteredUsers(users.filter(user => user.is_active === true));
  }, [users]);

  const noneActiveFiltering = useCallback(() => {
    setFilteredUsers(users.filter(user => user.is_active === false));
  }, [users]);

  const staffFiltering = useCallback(() => {
    setFilteredUsers(users.filter(user => user.is_staff === true));
  }, [users]);

  const noneStaffFiltering = useCallback(() => {
    setFilteredUsers(users.filter(user => user.is_staff === false));
  }, [users]);

  const handleChangeFiltering = ({ target: { value } }) => {
    setFilteringType(value);
    switch (value) {
      case FILTERING_TYPE.NONE:
        break;
      case FILTERING_TYPE.ACTIVE:
        activeFiltering();
        break;
      case FILTERING_TYPE.NONE_ACTIVE:
        noneActiveFiltering();
        break;
      case FILTERING_TYPE.STAFF:
        staffFiltering();
        break;
      case FILTERING_TYPE.NONE_STAFF:
        noneStaffFiltering();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const getUserList = async () => {
      await dispatch(fetchUsersList()).unwrap();
    };
    getUserList();
  }, [dispatch]);

  return status === API_STATUS.LOADING ? (
    <div>Loading...</div>
  ) : (
    <>
      <FormControl style={{ width: '200px' }}>
        <InputLabel>필터링</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={filteringType}
          onChange={handleChangeFiltering}
        >
          <MenuItem value={FILTERING_TYPE.NONE}>{FILTERING_TYPE.NONE}</MenuItem>
          <MenuItem value={FILTERING_TYPE.ACTIVE}>{FILTERING_TYPE.ACTIVE}</MenuItem>
          <MenuItem value={FILTERING_TYPE.NONE_ACTIVE}>{FILTERING_TYPE.NONE_ACTIVE}</MenuItem>
          <MenuItem value={FILTERING_TYPE.STAFF}>{FILTERING_TYPE.STAFF}</MenuItem>
          <MenuItem value={FILTERING_TYPE.NONE_STAFF}>{FILTERING_TYPE.NONE_STAFF}</MenuItem>
        </Select>
      </FormControl>
      {filteringType === FILTERING_TYPE.NONE ? (
        <Box minWidth={'1500px'}>
          <Grid container>
            <Grid item xs={1}>
              <Item>고객명</Item>
              <ul>
                {users.map(user => (
                  <li key={user.uuid}>{maskingName(user.name)}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>계좌 수</Item>
              <ul>
                {users.map((user, idx) => (
                  <li key={idx}>{user.userOwnAccountNum}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>이메일</Item>
              <ul>
                {users.map(user => (
                  <li key={user.uuid}>{user.email}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>성별</Item>
              <ul>
                {users.map(user => (
                  <li key={user.uuid}>{user.gender_origin}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>생년월일</Item>
              <ul>
                {users?.map(user => {
                  return <li key={user.uuid}>{convertDate(user.birth_date)}</li>;
                })}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>번호</Item>
              <ul>
                {users.map(user => (
                  <li key={user.uuid}>{maskingPhonNumber(user.phone_number)}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>최근 로그인</Item>
              <ul>
                {users.map(user => (
                  <li key={user.uuid}>{convertDate(user.last_login)}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>수신 동의 여부</Item>
              <ul>
                {users.map(setting => (
                  <li key={setting.uuid}>{String(setting.allow_marketing_push)}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>활성화 여부</Item>
              <ul>
                {users.map(setting => (
                  <li key={setting.uuid}>{String(setting.is_active)}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>가입일</Item>
              <ul>
                {users.map(user => (
                  <li key={user.uuid}>{convertDate(user.created_at)}</li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box minWidth={'1500px'}>
          <Grid container>
            <Grid item xs={1}>
              <Item>고객명</Item>
              <ul>
                {filteredUsers?.map(user => (
                  <li key={user.uuid}>{maskingName(user.name)}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>계좌 수</Item>
              <ul>
                {filteredUsers?.map((user, idx) => (
                  <li key={idx}>{user.userOwnAccountNum}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>이메일</Item>
              <ul>
                {filteredUsers?.map(user => (
                  <li key={user.uuid}>{user.email}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>성별</Item>
              <ul>
                {filteredUsers?.map(user => (
                  <li key={user.uuid}>{user.gender_origin}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>생년월일</Item>
              <ul>
                {filteredUsers?.map(user => {
                  return <li key={user.uuid}>{convertDate(user.birth_date)}</li>;
                })}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>번호</Item>
              <ul>
                {filteredUsers?.map(user => (
                  <li key={user.uuid}>{maskingPhonNumber(user.phone_number)}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>최근 로그인</Item>
              <ul>
                {filteredUsers?.map(user => (
                  <li key={user.uuid}>{convertDate(user.last_login)}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>수신 동의 여부</Item>
              <ul>
                {filteredUsers?.map(setting => (
                  <li key={setting.uuid}>{String(setting.allow_marketing_push)}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>활성화 여부</Item>
              <ul>
                {filteredUsers?.map(setting => (
                  <li key={setting.uuid}>{String(setting.is_active)}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>가입일</Item>
              <ul>
                {filteredUsers?.map(user => (
                  <li key={user.uuid}>{convertDate(user.created_at)}</li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}

export default User;
