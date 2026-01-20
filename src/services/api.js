import axios from 'axios';

const api = axios.create({
  // Using relative path to go through Vite proxy (avoids CORS)
  baseURL: '/api/v1',
  headers: {
    "ngrok-skip-browser-warning": "true"
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
