import axios from 'axios';

class ApiService {
  constructor(tokenStorage) {
    this.tokenStorage = tokenStorage;
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return `Bearer ${token}`;
  }

  async getUsersApi(page = 1, limit = 10) {
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
}

export default ApiService;
