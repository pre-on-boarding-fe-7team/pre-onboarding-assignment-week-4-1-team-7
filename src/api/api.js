import axios from 'axios';

// const API_URL = `${process.env.REACT_APP_API_URL}`;
const TOKEN = `${process.env.REACT_APP_TOKEN}`;

const api = axios.create({
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const getAccountsApi = async params => {
  const response = await api.get(`/accounts`, { params });
  return { data: response.data, total: response.headers['x-total-count'] };
};

export const getUsersApi = async () => {
  const response = await api.get(`/users`);
  return response.data;
};
