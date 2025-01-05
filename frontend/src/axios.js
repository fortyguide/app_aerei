import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:3000/api',
  withCredentials: true, // Permette l'invio di cookie con le richieste
});

export default instance;