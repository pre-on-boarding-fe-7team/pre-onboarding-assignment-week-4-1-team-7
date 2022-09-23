import axios from 'axios';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1amluQGdtYWlsLmNvbSIsImlhdCI6MTY2MzkwODE2OCwiZXhwIjoxNjYzOTExNzY4LCJzdWIiOiIxMDEifQ.m6dAhQatgwW3VU117Aemtz0EuC_MYxHNBTZjvs6fNtc';

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
