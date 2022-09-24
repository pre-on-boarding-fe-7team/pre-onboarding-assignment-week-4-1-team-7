import axios from 'axios';

class ApiService {
  constructor(tokenStorage) {
    this.tokenStorage = tokenStorage;
  }

  getHeaders() {
    // const token = this.tokenStorage.getToken();
    return `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imt5eUBuYXZlci5jb20iLCJpYXQiOjE2NjQwMjA0OTgsImV4cCI6MTY2NDAyNDA5OCwic3ViIjoiMTAxIn0.pC1baRoaqv3r7_MtjSCcmzoGhp8QWEM8habbktjMzu0`;
    //`Bearer ${token}`
  }

  async getUsersApi(params) {
    const response = await axios.get(`/users`, {
      headers: {
        Authorization: this.getHeaders(),
      },
      params,
    });
    return { data: response.data, total: response.headers['x-total-count'] };
  }

  async searchUsersApi(params) {
    const response = await axios.get(`/users`, {
      headers: {
        Authorization: this.getHeaders(),
      },
      params,
    });
    console.info('@@', response.headers['x-total-count']);
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

  async getAccountsApi(params) {
    const response = await axios.get(`/accounts`, {
      headers: {
        Authorization: this.getHeaders(),
      },
      params,
    });
    return { data: response.data, total: response.headers['x-total-count'] };
  }
}

export default ApiService;
