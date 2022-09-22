import axios from 'axios';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ2FtaWwuY29tIiwiaWF0IjoxNjYzODI3NDA5LCJleHAiOjE2NjM4MzEwMDksInN1YiI6IjEwMSJ9.BVub25pvocTDUNlNS28Bl1LbvkeeiK7E97T1d_KEiXE';

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
