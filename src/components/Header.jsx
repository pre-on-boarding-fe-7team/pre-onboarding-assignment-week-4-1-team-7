import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUsersThunk } from '../modules/usersSlice';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Link from '@mui/material/Link';
import { useLocation } from 'react-router-dom';

const title = {
  accounts: '계좌 목록',
  users: '사용자 목록',
};

const Header = () => {
  const dispatch = useDispatch();
  const accounts = useSelector(state => state.users);
  const location = useLocation();
  const pathname = location.pathname.replace('/', '');

  useEffect(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  console.info();
  return (
    <AppBars position="sticky">
      <Toolbar
        sx={{
          pr: '24px',
        }}
      >
        <Typography component="h1" variant="h5" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          <div>{title[pathname]}</div>
        </Typography>
        {accounts.data !== null ? (
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        ) : (
          <Link href="/login" color="inherit" variant="body2" underline="hover">
            Login
          </Link>
        )}
      </Toolbar>
    </AppBars>
  );
};

export default Header;

const AppBars = styled(AppBar)`
  position: sticky;
`;
