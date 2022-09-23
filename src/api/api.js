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

export const postSignUpApi = async ({ ...userValues }) => {
  const res = await axios.post('/users/signup', { ...userValues });
  return res.data;
};

export const postLoginApi = async ({ ...userValues }) => {
  try {
    const res = await axios.post('/login', { ...userValues });
    localStorage.setItem('accessToken', res.data.accessToken);
  } catch (err) {
    alert(err);
  }
};

export const getUsersApi = async (page, limit) => {
  const res = await api.get('/users', {
    params: {
      _page: page,
      _limit: limit,
    },
  });
  return { data: res.data, total: res.headers['x-total-count'] };
};

export const getSettingApi = async () => {
  const res = await api.get(`/userSetting`);
  return res.data;
};

export const getAccountsApi = async () => {
  const res = await api.get('/accounts');
  return res.data;
};

export const patchUserDataApi = async ({ ...userValues }, userId) =>
  await api.patch(`/users/${userId}`, { ...userValues });
