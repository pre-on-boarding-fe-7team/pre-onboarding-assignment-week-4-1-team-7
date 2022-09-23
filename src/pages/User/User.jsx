import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  noFilteringUsers,
  activeFilteringUsers,
  noneActiveFilteringUsers,
  staffFilteringUsers,
  noneStaffFilteringUsers,
  fetchSearchUsersList,
  fetchUsersList,
} from '../../modules/usersSlice';
import { API_STATUS, FILTERING_TYPE, ROUTE } from '../../common/utils/constant';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const UserProperties = {
  name: '고객명',
  userOwnAccountNum: '계좌 수',
  email: '이메일',
  gender_origin: '성별',
  birth_date: '생년월일',
  phone_number: '번호',
  last_login: '최근 로그인',
  allow_marketing_push: '수신 동의 여부',
  is_active: '활성화 여부',
  created_at: '가입일',
};

function User() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { users, filteredUsers, status } = useSelector(state => state.usersReducer);
  const [filteringType, setFilteringType] = useState(FILTERING_TYPE.NONE);
  const [searchValue, setSearchValue] = useState('');

  const handleSubmitSearchValue = async e => {
    e.preventDefault();
    try {
      await dispatch(fetchSearchUsersList(searchValue)).unwrap();
      setFilteringType(FILTERING_TYPE.NONE);
      navigate({
        pathname: ROUTE.USER,
        search: `?search=${searchValue}`,
      });
    } catch (e) {
      throw new Error(e);
    }
  };

  const handleChangeSearchValue = useCallback(({ target: { value } }) => {
    setSearchValue(value);
  }, []);

  const handleChangeFiltering = ({ target: { value } }) => {
    setFilteringType(value);

    switch (value) {
      case FILTERING_TYPE.NONE:
        dispatch(noFilteringUsers());
        navigate({
          pathname: ROUTE.USER,
          search: '',
        });
        break;
      case FILTERING_TYPE.ACTIVE:
        dispatch(activeFilteringUsers());
        navigate({
          pathname: ROUTE.USER,
          search: '?filter=active',
        });
        break;
      case FILTERING_TYPE.NONE_ACTIVE:
        dispatch(noneActiveFilteringUsers());
        navigate({
          pathname: ROUTE.USER,
          search: '?filter=not-active',
        });
        break;
      case FILTERING_TYPE.STAFF:
        dispatch(staffFilteringUsers());
        navigate({
          pathname: ROUTE.USER,
          search: '?filter=staff',
        });
        break;
      case FILTERING_TYPE.NONE_STAFF:
        dispatch(noneStaffFilteringUsers());
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
      try {
        await dispatch(fetchUsersList()).unwrap();
      } catch (e) {
        throw new Error(e);
      }
    };
    getUserList();
  }, [dispatch]);

  return status === API_STATUS.LOADING ? (
    <div>Loading...</div>
  ) : (
    <>
      <FormControl style={{ width: '200px' }}>
        <InputLabel>필터링</InputLabel>
        <Select value={filteringType} onChange={handleChangeFiltering}>
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
      {status === API_STATUS.SERACH_LOADING ? (
        <div>Loading...</div>
      ) : (
        <Box minWidth={'1500px'}>
          <Grid container>
            {filteredUsers.length === 0
              ? Object.entries(UserProperties).map(([key, value], index) => (
                  <Grid item xs={1} key={key}>
                    <Item>{value}</Item>
                    <ul>
                      {users?.map(user => (
                        <li key={user.uuid}>{user[key]}</li>
                      ))}
                    </ul>
                  </Grid>
                ))
              : Object.entries(UserProperties).map(([key, value], index) => (
                  <Grid item xs={1} key={key}>
                    <Item>{value}</Item>
                    <ul>
                      {filteredUsers?.map(user => (
                        <li key={user.uuid}>{user[key]}</li>
                      ))}
                    </ul>
                  </Grid>
                ))}
          </Grid>
        </Box>
      )}
    </>
  );
}

export default User;
