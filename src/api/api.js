import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}`;
const TOKEN = `${process.env.REACT_APP_TOKEN}`;

const api = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

// const getPosts = async () => {
//   const response = await axios.get('/accounts');
//   return response.data;
// };

const getAccounts = async () => await api.get(`accounts`);
// const saveComment = async comment => api.post(``, comment);
// const updateComment = async comment => await api.put(`/${comment.id}`, comment);
// const deleteComment = async id => await api.delete(`/${id}`);

export { getAccounts };
// export { getPosts, getAccounts, saveComment, updateComment, deleteComment };

// const baseUrl = process.env.REACT_APP_SERVER_URL;

// const get = async endpoint => {
//   const url = baseUrl + endpoint;
//   const res = await fetch(url);
//   if (!res.ok) {
//     throw new Error(`${res.status.toString()} Error 인한 요청 실패!`);
//   }
//   const result = await res.json();

//   return result;
// };

// export { get };
