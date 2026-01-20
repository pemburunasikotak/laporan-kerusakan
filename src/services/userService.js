import axios from 'axios';

// Create a specific instance for User API
const userApi = axios.create({
  // Using relative path to go through Vite proxy (avoids CORS)
  baseURL: '/api/v1',
  headers: {
    "ngrok-skip-browser-warning": "true"
  }
});

// Add auth token if available
userApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const userService = {
  // Users
  getUsers: async () => {
    const response = await userApi.get('/users');
    return response.data;
  },
  getUser: async (id) => {
    const response = await userApi.get(`/users/${id}`);
    return response.data;
  },
  createUser: async (data) => {
    const response = await userApi.post('/users', data);
    return response.data;
  },
  updateUser: async (id, data) => {
    const response = await userApi.put(`/users/${id}`, data);
    return response.data;
  },
  deleteUser: async (id) => {
    const response = await userApi.delete(`/users/${id}`);
    return response.data;
  },
};
