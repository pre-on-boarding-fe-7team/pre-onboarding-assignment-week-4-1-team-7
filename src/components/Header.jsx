import React from 'react';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useLocation } from 'react-router-dom';

const headerTitle = {
  accounts: '계좌 목록',
  users: '사용자 목록',
};

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname.replace('/', '');

  return (
    <AppBars position="sticky">
      <Toolbar
        sx={{
          pr: '24px',
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{
            marginRight: '150px',
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h5" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          <div>{headerTitle[pathname]}</div>
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBars>
  );
};

export default Header;

const AppBars = styled(AppBar)`
  position: sticky;
`;
