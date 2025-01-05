import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:3000/api', // Cambia questo URL se necessario
});

export default instance;