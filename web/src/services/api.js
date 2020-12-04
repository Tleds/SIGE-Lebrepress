import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3000',
  validateStatus: false,
});

export default api;
