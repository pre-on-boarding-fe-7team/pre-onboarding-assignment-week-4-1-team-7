import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}`;
const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_AUTH}`,
  },
});

const getUsers = async () => await api.get('/users');

export { getUsers };
