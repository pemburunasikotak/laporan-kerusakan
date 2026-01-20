import axios from 'axios';

// Create a specific instance for Master Data API
// Only for these master data parts as requested
const masterDataApi = axios.create({
  // Using relative path to go through Vite proxy (avoids CORS)
  baseURL: '/api/v1',
  headers: {
    "ngrok-skip-browser-warning": "true"
  }
});

// Add auth token if available (assuming same auth mechanism)
masterDataApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const masterDataService = {
  // Buildings
  getBuildings: async () => {
    const response = await masterDataApi.get('/buildings');
    return response.data;
  },
  getBuilding: async (id) => {
    const response = await masterDataApi.get(`/buildings/${id}`);
    return response.data;
  },
  createBuilding: async (data) => {
    const response = await masterDataApi.post('/buildings', data);
    return response.data;
  },
  updateBuilding: async (id, data) => {
    const response = await masterDataApi.put(`/buildings/${id}`, data);
    return response.data;
  },
  deleteBuilding: async (id) => {
    const response = await masterDataApi.delete(`/buildings/${id}`);
    return response.data;
  },
  getBuildingFloors: async (buildingId) => {
    const response = await masterDataApi.get(`/buildings/${buildingId}/floors`);
    return response.data;
  },

  // Floors
  getFloors: async () => {
    const response = await masterDataApi.get('/floors');
    return response.data;
  },
  getFloor: async (id) => {
    const response = await masterDataApi.get(`/floors/${id}`);
    return response.data;
  },
  createFloor: async (data) => {
    const response = await masterDataApi.post('/floors', data);
    return response.data;
  },
  updateFloor: async (id, data) => {
    const response = await masterDataApi.put(`/floors/${id}`, data);
    return response.data;
  },
  deleteFloor: async (id) => {
    const response = await masterDataApi.delete(`/floors/${id}`);
    return response.data;
  },
  getFloorRooms: async (floorId) => {
    const response = await masterDataApi.get(`/floors/${floorId}/rooms`);
    return response.data;
  },

  // Rooms
  getRooms: async () => {
    const response = await masterDataApi.get('/rooms');
    return response.data;
  },
  getRoom: async (id) => {
    const response = await masterDataApi.get(`/rooms/${id}`);
    return response.data;
  },
  createRoom: async (data) => {
    const response = await masterDataApi.post('/rooms', data);
    return response.data;
  },
  updateRoom: async (id, data) => {
    const response = await masterDataApi.put(`/rooms/${id}`, data);
    return response.data;
  },
  deleteRoom: async (id) => {
    const response = await masterDataApi.delete(`/rooms/${id}`);
    return response.data;
  },
  getRoomComponents: async (roomId) => {
    const response = await masterDataApi.get(`/rooms/${roomId}/components`);
    return response.data;
  },

  // Categories (Component Categories)
  getCategories: async () => {
    const response = await masterDataApi.get('/component-categories');
    return response.data;
  },
  getCategory: async (id) => {
    const response = await masterDataApi.get(`/component-categories/${id}`);
    return response.data;
  },
  createCategory: async (data) => {
    const response = await masterDataApi.post('/component-categories', data);
    return response.data;
  },
  updateCategory: async (id, data) => {
    const response = await masterDataApi.put(`/component-categories/${id}`, data);
    return response.data;
  },
  deleteCategory: async (id) => {
    const response = await masterDataApi.delete(`/component-categories/${id}`);
    return response.data;
  },
  getCategoryComponents: async (categoryId) => {
    const response = await masterDataApi.get(`/component-categories/${categoryId}/components`);
    return response.data;
  },

  // Equipment (Components)
  getEquipment: async () => {
    const response = await masterDataApi.get('/components');
    return response.data;
  },
  getComponent: async (id) => {
    const response = await masterDataApi.get(`/components/${id}`);
    return response.data;
  },
  createEquipment: async (data) => {
    const response = await masterDataApi.post('/components', data);
    return response.data;
  },
  updateEquipment: async (id, data) => {
    const response = await masterDataApi.put(`/components/${id}`, data);
    return response.data;
  },
  deleteEquipment: async (id) => {
    const response = await masterDataApi.delete(`/components/${id}`);
    return response.data;
  },
};
