import { create } from 'zustand';
import api from '../services/api';

const useReportStore = create((set, get) => ({
  reports: [],
  technicians: [],
  loading: false,
  
  fetchReports: async () => {
    set({ loading: true });
    try {
      const res = await api.get('/reports');
      set({ reports: res.data, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  fetchTechnicians: async () => {
    try {
      const res = await api.get('/technicians');
      set({ technicians: res.data });
    } catch (error) {
      console.error(error);
    }
  },

  assignTechnician: async (reportId, technicianId) => {
    try {
      await api.patch(`/reports/${reportId}/assign`, { technicianId });
      // Refresh
      get().fetchReports();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  updateStatus: async (reportId, status) => {
    try {
      await api.patch(`/reports/${reportId}/status`, { status });
      get().fetchReports();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}));

export default useReportStore;
