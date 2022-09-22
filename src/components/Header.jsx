import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import NotificationsIcon from '@mui/icons-material/Notifications';
export const Header = () => {
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
          <div> Dashboard</div>
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

const AppBars = styled(AppBar)`
  position: sticky;
`;
