import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './styles/theme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './modules/store';
import TokenStorage from './common/utils/token';
import Auth from './common/utils/auth';
import ApiService from './api/api';

const tokenStorage = new TokenStorage();
const auth = new Auth(tokenStorage);
export const apiservice = new ApiService(tokenStorage);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Provider store={store}>
        <App auth={auth} token={tokenStorage} />
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
);
