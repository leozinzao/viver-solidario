
import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import AdminScreen from '@/screens/AdminScreen';

const AdminPanelPage: React.FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <AdminScreen />
      </div>
    </AuthProvider>
  );
};

export default AdminPanelPage;
