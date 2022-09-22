import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import { Sider } from '../components/Sider';
import Account from '../pages/Account/Account';
import { Header } from './Header';
import styled from 'styled-components';

const DashBoard = () => {
  return (
    <ThemeProvider>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <Drawer variant="permanent">
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton>
              <AccountBalanceIcon />
              PREFACE
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <Sider />
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Lists
          component="main"
          sx={{
            backgroundColor: theme =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Account />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Lists>
      </Box>
    </ThemeProvider>
  );
};

const Lists = styled(Box)`
  margin: 0 auto;
`;

export default DashBoard;
