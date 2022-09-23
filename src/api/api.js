import axios from 'axios';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1amluQGdtYWlsLmNvbSIsImlhdCI6MTY2Mzk0OTc0NSwiZXhwIjoxNjYzOTUzMzQ1LCJzdWIiOiIxMDEifQ.74m0WR8hiEk4Hz_WgXHrQlqjdbZE-rBK9vynNhXD7RI';

const api = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
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
