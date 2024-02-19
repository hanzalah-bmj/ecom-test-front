// AdminLayout.js
import React from 'react';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Admin Sidebar (Assuming you have a component named AdminSidebar) */}
      <AdminSidebar />

      {/* Admin Main Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;