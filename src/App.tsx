import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './components/layouts/AdminLayout';
import { PublicLayout } from './components/layouts/PublicLayout';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminLogin } from './pages/admin/Login';
import { TVDisplay } from './pages/TVDisplay';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public TV Display Route */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<TVDisplay />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="login" element={<AdminLogin />} />
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;