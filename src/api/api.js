import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}`;
const api = axios.create({
  baseURL: API_URL,
  headers: {
    // Authorization: `Bearer ${process.env.REACT_APP_AUTH}`,
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbHphQHRlc3QuY29tIiwiaWF0IjoxNjYzODQyMjgyLCJleHAiOjE2NjM4NDU4ODIsInN1YiI6IjEwMSJ9.V9NR-6daTWHTDI3L3aqslXg3ykA6kTAQw7O-zhf94Pk`,
  },
});

const getUsers = async () => await api.get('/users');
const getAccounts = async () => await api.get('/accounts');
const getUserSettings = async () => await api.get('/userSetting');
const searchUsersList = async name => await api.get(`/users?q=${name}`);

export { getUsers, getAccounts, getUserSettings, searchUsersList };
