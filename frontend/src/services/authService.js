import axios from 'axios';

const API_URL = 'https://localhost:3000/api/auth/';

const login = async (email, password) => {
  const response = await axios.post(API_URL + 'login', { email, password }, { withCredentials: true });
  if (response.data.token) {
    document.cookie = `auth_token=${response.data.token}; path=/; secure; samesite=strict`;
  }
  return response.data;
};

const register = async (email, password, name, surname) => {
  const response = await axios.post(API_URL + 'register', { email, password, name, surname }, { withCredentials: true });
  return response.data;
};

const logout = () => {
  document.cookie = 'auth_token=; Max-Age=0; path=/; secure; samesite=strict';
};

const authService = {
  login,
  register,
  logout,
};

export default authService;