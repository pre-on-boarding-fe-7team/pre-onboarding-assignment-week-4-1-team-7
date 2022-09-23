import axios from 'axios';

class ApiService {
  constructor(tokenStorage) {
    this.tokenStorage = tokenStorage;
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return `Bearer ${token}`;
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

  async searchUsersApi(query) {
    const response = await axios.get(`/users`, {
      headers: {
        Authorization: this.getHeaders(),
      },
      params: {
        q: query,
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
}

export default ApiService;
