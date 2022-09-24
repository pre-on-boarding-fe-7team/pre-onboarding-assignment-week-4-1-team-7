import axios from 'axios';

class ApiService {
  constructor(tokenStorage) {
    this.tokenStorage = tokenStorage;
  }

  getHeaders() {
    // const token = this.tokenStorage.getToken();
    return `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjY0MDE4ODAyLCJleHAiOjE2NjQwMjI0MDIsInN1YiI6IjEwMSJ9.Mefwvat_wM7lJ6yHBtejpqWKeLajFZqqTdhbQT2ni7A`;
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

  async getAccountsApi(params) {
    const response = await axios.get(`/accounts`, {
      headers: {
        Authorization: this.getHeaders(),
      },
      params,
    });
    return { data: response.data, total: response.headers['x-total-count'] };
  }

  async getAccountApi(params) {
    const response = await axios.get(`/accounts`, {
      headers: {
        Authorization: this.getHeaders(),
      },
      params,
    });

    return response.data[0];
  }

  // accounts.id가 고유하다는 가정하에 구현
  async updateAccountsApi(params) {
    const response = await axios.put(
      `/accounts/${params.id}`,
      { ...params },
      {
        headers: {
          Authorization: this.getHeaders(),
        },
      }
    );
    return response.data;
  }
}

export default ApiService;
