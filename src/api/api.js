import axios from 'axios';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ2FtaWwuY29tIiwiaWF0IjoxNjYzODI3NDA5LCJleHAiOjE2NjM4MzEwMDksInN1YiI6IjEwMSJ9.BVub25pvocTDUNlNS28Bl1LbvkeeiK7E97T1d_KEiXE';

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
