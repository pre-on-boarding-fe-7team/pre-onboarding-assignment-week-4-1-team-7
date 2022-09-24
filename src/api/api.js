import axios from 'axios';

class ApiService {
  constructor(tokenStorage) {
    this.tokenStorage = tokenStorage;
  }

  getHeaders() {
    // const token = this.tokenStorage.getToken();
    return `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InF3ZXF3ZTEyQG5hdmVyLmNvbSIsImlhdCI6MTY2NDAxNDIwNCwiZXhwIjoxNjY0MDE3ODA0LCJzdWIiOiIxMDQifQ.V7E_GuDauD0uAVa1--1ayxZAYemmcv2-5RSJTenHcqc`;
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
}

export default ApiService;
