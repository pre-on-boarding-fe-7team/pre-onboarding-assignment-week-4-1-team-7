import axios from 'axios';

class ApiService {
  constructor(tokenStorage) {
    this.tokenStorage = tokenStorage;
  }

  getHeaders() {
    // const token = this.tokenStorage.getToken();
    return `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imt5eUBuYXZlci5jb20iLCJpYXQiOjE2NjM5ODMwODIsImV4cCI6MTY2Mzk4NjY4Miwic3ViIjoiMTAxIn0.VCs8klvAtQzURgO48WicOdnwy71YI3WYpcyJ25waG7o`;
    //`Bearer ${token}`
  }

  async getUsersApi(page, limit) {
    const response = await axios.get(`/users`, {
      headers: {
        Authorization: this.getHeaders(),
      },
      params: {
        _page: page,
        _limit: limit,
      },
    });
    return { data: response.data, total: response.headers['x-total-count'] };
  }

  async searchUsersApi(query, page = 1, limit = 10) {
    const response = await axios.get(`/users`, {
      headers: {
        Authorization: this.getHeaders(),
      },
      params: {
        q: query,
        _page: page,
        _limit: limit,
      },
    });
    return { data: response.data, total: response.headers['x-total-count'] };
  }

  async getSettingApi() {
    const response = await axios.get(`/userSetting`, {
      headers: {
        Authorization: this.getHeaders(),
      },
    });
    return response.data;
  }

  async getAccountsApi() {
    const response = await axios.get(`/accounts`, {
      headers: {
        Authorization: this.getHeaders(),
      },
    });
    return response.data;
  }
}

// export default ApiService;
// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1amluQGdtYWlsLmNvbSIsImlhdCI6MTY2Mzk0OTc0NSwiZXhwIjoxNjYzOTUzMzQ1LCJzdWIiOiIxMDEifQ.74m0WR8hiEk4Hz_WgXHrQlqjdbZE-rBK9vynNhXD7RI';

// const api = axios.create({
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

// export const getAccountsApi = async params => {
//   const response = await api.get(`/accounts`, { params });
//   return { data: response.data, total: response.headers['x-total-count'] };
// };

// export const getUsersApi = async () => {
//   const response = await api.get(`/users`);
//   return response.data;
// };
