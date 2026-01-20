import axios from 'axios';

// Create a specific instance for health API
const healthApi = axios.create({
  // Using relative path to go through Vite proxy (avoids CORS)
  baseURL: '/api/v1',
  headers: {
    "ngrok-skip-browser-warning": "true"
  }
});

export const healthService = {
  // Health Check
  checkHealth: async () => {
    const response = await healthApi.get('/health');
    return response.data;
  },
};
