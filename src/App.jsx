import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import useAuthStore from './store/authStore';
import DashboardOverview from './pages/DashboardOverview';
import ReportsList from './pages/ReportsList';
import TechniciansPage from './pages/TechniciansPage';
import MasterDataPage from './pages/MasterDataPage';
import WhatsAppManagement from './pages/WhatsAppManagement';
import TechnicianDashboard from './pages/TechnicianDashboard';
import PublicReportPage from './pages/PublicReportPage';
import TechnicianUpdatePage from './pages/TechnicianUpdatePage';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = useAuthStore((state) => state.user) || JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // Or forbidden page
  }
  return children;
};

function App() {
  const user = useAuthStore((state) => state.user) || JSON.parse(localStorage.getItem('user'));

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/lapor" element={<PublicReportPage />} />
        <Route path="/update/:ticketId" element={<TechnicianUpdatePage />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={
            user?.role === 'ADMIN' ? 
            <Navigate to="/dashboard" replace /> : 
            <Navigate to="/technician" replace />
          } />
          
          <Route path="dashboard" element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <DashboardOverview />
            </ProtectedRoute>
          } />
          
          <Route path="laporan" element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <ReportsList />
            </ProtectedRoute>
          } />
          
          <Route path="teknisi" element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <TechniciansPage />
            </ProtectedRoute>
          } />
          
          <Route path="master-data" element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <MasterDataPage />
            </ProtectedRoute>
          } />
          
          <Route path="whatsapp" element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <WhatsAppManagement />
            </ProtectedRoute>
          } />
          
          <Route path="technician" element={
            <ProtectedRoute allowedRoles={['TECHNICIAN']}>
              <TechnicianDashboard />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
