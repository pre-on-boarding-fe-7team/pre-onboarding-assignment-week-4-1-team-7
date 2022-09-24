import axios from 'axios';

class Auth {
  constructor(tokenStorage) {
    this.tokenStorage = tokenStorage;
  }

  async signIn(email, password) {
    const response = await axios.post(`/login`, {
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
