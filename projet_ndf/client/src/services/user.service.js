import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/users/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAssistantBoard() {
    return axios.get(API_URL + 'assistant', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
