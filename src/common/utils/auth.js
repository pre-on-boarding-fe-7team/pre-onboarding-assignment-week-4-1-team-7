import axios from 'axios';

class Auth {
  constructor(tokenStorage) {
    this.tokenStorage = tokenStorage;
    this.email = '';
  }

  async signIn(email, password) {
    const response = await axios.post(`/login`, {
      email,
      password,
    });
    this.tokenStorage.saveToken(response.data.accessToken);
    this.email = email;
    return response.data;
  }

  logout() {
    this.tokenStorage.clearToken();
    this.email = '';
  }
}

export default Auth;
