import axios from 'axios';

const API_URL = 'https://localhost:3000/api/auth/';

const login = async (email, password, captchaToken) => {
  const response = await axios.post(API_URL + 'login', { email, password, captchaToken });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const register = async (email, password, name, surname) => {
  const response = await axios.post(API_URL + 'register', { email, password, name, surname });
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  login,
  register,
  logout,
};

export default authService;
