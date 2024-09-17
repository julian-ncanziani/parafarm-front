import React from 'react';
import { AdminPageProvider } from '@/context/AdminContext';
import Sidebar from '@/components/adminPageComponents/Sidebar';
interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <AdminPageProvider>
        <div className="flex min-h-screen">
        <Sidebar></Sidebar>
        {children}
        </div>
    </AdminPageProvider>
  );
};

export default AdminLayout;
