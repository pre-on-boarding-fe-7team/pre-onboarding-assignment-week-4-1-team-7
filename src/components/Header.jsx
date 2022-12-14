import React from 'react';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { useLocation } from 'react-router-dom';

const title = {
  accounts: '계좌 목록',
  account: '계좌 정보',
  users: '사용자 목록',
  user: '사용자 정보',
};

const Header = ({ email, logoutHandler }) => {
  const location = useLocation();
  const pathname = location.pathname.replace('/', '').split('/')[0];

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
        <Typography color="inherit" variant="body2" underline="hover">
          {email}
          <b onClick={logoutHandler} style={{ marginLeft: '10px', cursor: 'pointer' }}>
            LOGOUT
          </b>
        </Typography>
      </Toolbar>
    </AppBars>
  );
};

export default Header;

const AppBars = styled(AppBar)`
  position: sticky;
`;
