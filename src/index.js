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
import axios from 'axios';
import ApiService from './api/api';
import { GlobalStyle } from './styles/global-styles';

const httpClient = axios.create({
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
  },
});
const tokenStorage = new TokenStorage();
const auth = new Auth(tokenStorage, httpClient);
export const apiservice = new ApiService(tokenStorage, httpClient);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <CssBaseline />
    <BrowserRouter>
      <Provider store={store}>
        <App auth={auth} token={tokenStorage} />
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
  // </React.StrictMode>
);
