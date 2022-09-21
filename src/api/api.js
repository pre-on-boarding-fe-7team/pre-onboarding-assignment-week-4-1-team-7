import axios from 'axios';

const token = process.env.REACT_APP_TOKEN;

const api = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getUsersApi = async () => {
  const response = await api.get(`/users`);
  return response.data;
};

export const getAccountsApi = async () => {
  const response = await api.get(`/accounts`);
  return response.data;
};
