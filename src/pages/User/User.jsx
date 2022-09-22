import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchUsersList, fetchUsersList } from '../../modules/usersSlice';
import { API_STATUS, FILTERING_TYPE, ROUTE } from '../../common/utils/constant';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function User() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { users, searchedUsers, status } = useSelector(state => state.usersReducer);
  console.info(searchedUsers);
  const [filteringType, setFilteringType] = useState(FILTERING_TYPE.NONE);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  const handleSubmitSearchValue = async e => {
    e.preventDefault();
    await dispatch(fetchSearchUsersList(searchValue)).unwrap();
    navigate({
      pathname: ROUTE.USER,
      search: `?search=${searchValue}`,
    });
  };
  const handleChangeSearchValue = useCallback(({ target: { value } }) => {
    setSearchValue(value);
  }, []);

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
        navigate({
          pathname: ROUTE.USER,
          search: '',
        });
        break;
      case FILTERING_TYPE.ACTIVE:
        activeFiltering();
        navigate({
          pathname: ROUTE.USER,
          search: '?filter=active',
        });
        break;
      case FILTERING_TYPE.NONE_ACTIVE:
        noneActiveFiltering();
        navigate({
          pathname: ROUTE.USER,
          search: '?filter=not-active',
        });
        break;
      case FILTERING_TYPE.STAFF:
        staffFiltering();
        navigate({
          pathname: ROUTE.USER,
          search: '?filter=staff',
        });
        break;
      case FILTERING_TYPE.NONE_STAFF:
        noneStaffFiltering();
        navigate({
          pathname: ROUTE.USER,
          search: '?filter=not-staff',
        });
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
      <form onSubmit={handleSubmitSearchValue}>
        <FormControl style={{ width: '200px' }}>
          <InputLabel>검색</InputLabel>
          <Input id="search" value={searchValue} onChange={handleChangeSearchValue} />
        </FormControl>
      </form>
      {filteringType === FILTERING_TYPE.NONE ? (
        <Box minWidth={'1500px'}>
          <Grid container>
            <Grid item xs={1}>
              <Item>고객명</Item>
              <ul>
                {users.map(user => (
                  <li key={user.uuid}>{user.name}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>계좌 수</Item>
              <ul>
                {users.map(user => (
                  <li key={user.uuid}>{user.userOwnAccountNum}</li>
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
                  return <li key={user.uuid}>{user.birth_date}</li>;
                })}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>번호</Item>
              <ul>
                {users.map(user => (
                  <li key={user.uuid}>{user.phone_number}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>최근 로그인</Item>
              <ul>
                {users.map(user => (
                  <li key={user.uuid}>{user.last_login}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>수신 동의 여부</Item>
              <ul>
                {users.map(user => (
                  <li key={user.uuid}>{String(user.allow_marketing_push)}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>활성화 여부</Item>
              <ul>
                {users.map(user => (
                  <li key={user.uuid}>{String(user.is_active)}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>가입일</Item>
              <ul>
                {users.map(user => (
                  <li key={user.uuid}>{user.created_at}</li>
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
                  <li key={user.uuid}>{user.name}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>계좌 수</Item>
              <ul>
                {filteredUsers?.map((user, idx) => (
                  <li key={user.uuid}>{user.userOwnAccountNum}</li>
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
                  return <li key={user.uuid}>{user.birth_date}</li>;
                })}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>번호</Item>
              <ul>
                {filteredUsers?.map(user => (
                  <li key={user.uuid}>{user.phone_number}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>최근 로그인</Item>
              <ul>
                {filteredUsers?.map(user => (
                  <li key={user.uuid}>{user.last_login}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>수신 동의 여부</Item>
              <ul>
                {filteredUsers?.map(user => (
                  <li key={user.uuid}>{String(user.allow_marketing_push)}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>활성화 여부</Item>
              <ul>
                {filteredUsers?.map(user => (
                  <li key={user.uuid}>{String(user.is_active)}</li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={1}>
              <Item>가입일</Item>
              <ul>
                {filteredUsers?.map(user => (
                  <li key={user.uuid}>{user.created_at}</li>
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
