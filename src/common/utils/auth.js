class Auth {
  constructor(tokenStorage, httpClient) {
    this.tokenStorage = tokenStorage;
    this.axios = httpClient;
  }

  async signIn(email, password) {
    const response = await this.axios.post(`/login`, {
      email,
      password,
    });
    this.tokenStorage.saveToken(response.data.accessToken);
    return response.data;
  }

  logout() {
    this.tokenStorage.clearToken();
  }
}

export default Auth;
