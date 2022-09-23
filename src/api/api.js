import axios from 'axios';

const api = axios.create({});

api.interceptors.request.use(
  config => {
    const authorization = localStorage.getItem('accessToken');
    config.headers.Authorization = `Bearer ${authorization}`;
    return config;
  },
  error => {
    alert('apiToken 에러입니다.');
  }
);

export const postSignUp = async ({ ...userValues }) => {
  const res = await axios.post('/users/signup', { ...userValues });
  // console.info('API', res);
  return res.data;
};

export const postLogin = async ({ ...userValues }) => {
  try {
    const res = await axios.post('/login', { ...userValues });
    // console.info('API', res);
    localStorage.setItem('accessToken', res.data.accessToken);
  } catch (err) {
    alert(err);
  }
};

export const getUsers = async () => {
  const res = await api.get('/users');
  // console.info('getUsers', res);
  return res.data;
};

export const getAccounts = async () => {
  const res = await api.get('/accounts');
  // console.info('getUsers', res);
  return res.data;
};
