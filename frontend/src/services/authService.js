import axios from '../axios';

const login = async (credentials) => {
  const response = await axios.post('/auth/login', credentials);
  return response.data;
};

const register = async (userData) => {
  const response = await axios.post('/auth/register', userData);
  return response.data;
};

export default {
  login,
  register
};