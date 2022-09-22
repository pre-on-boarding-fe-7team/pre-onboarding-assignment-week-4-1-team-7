class ApiService {
  //TODO: 토큰 추가
  constructor(tokenStorage, httpClient) {
    this.tokenStorage = tokenStorage;
    this.axios = httpClient;
  }

  async getUsersApi() {
    const response = await this.axios.get('/users');
    return response.data;
  }
}

export default ApiService;
