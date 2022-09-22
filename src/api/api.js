import axios from 'axios';

class ApiService {
  constructor(tokenStorage) {
    this.tokenStorage = tokenStorage;
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return `Bearer ${token}`;
  }

  async getUsersApi() {
    const response = await axios.get(`/users`, {
      headers: {
        Authorization: this.getHeaders(),
      },
    });
    return response.data;
  }
}

export default ApiService;
