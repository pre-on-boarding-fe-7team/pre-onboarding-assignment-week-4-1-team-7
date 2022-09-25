import axios from 'axios';

class ApiService {
  constructor(tokenStorage) {
    this.tokenStorage = tokenStorage;
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return `Bearer ${token}`;
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

  async getUserDetailApi(userId) {
    const response = await axios.get(`/users/${userId}`, {
      headers: {
        Authorization: this.getHeaders(),
      },
    });
    return { data: response.data };
  }

  async getUserAccountsApi(params) {
    const response = await axios.get(`/accounts`, {
      headers: {
        Authorization: this.getHeaders(),
      },
      params,
    });
    return { data: response.data };
  }

  async searchUsersApi(params) {
    const response = await axios.get(`/users`, {
      headers: {
        Authorization: this.getHeaders(),
      },
      params,
    });
    // console.info('@@', response.headers['x-total-count']);
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

  async patchUserDataApi(userValues, userId) {
    const response = await axios.patch(
      `/users/${userId}`,
      { ...userValues },
      {
        headers: {
          Authorization: this.getHeaders(),
        },
      }
    );
    return response.data;
  }

  async deleteUser(id) {
    const response = await axios.delete(`/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: this.getHeaders(),
      },
    });
    return response.data;
  }
}

export default ApiService;
