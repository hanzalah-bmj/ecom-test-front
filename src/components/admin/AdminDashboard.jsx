// AdminDashboard.jsx
import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import AdminHome from './AdminHome';
import Allproducts from './products/Allproducts';
import Addproducts from './products/Addproducts';
import Categories from './products/Categories';
import Allorders from './orders/Allorders';
import Allusers from './users/Allusers';

const AdminDashboard = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = /* Your logic to check if the user is logged in */ true;

  if (!isLoggedIn) {
    navigate('/signin');
    return null;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/home" />} />
        <Route path="/home" element={<AdminHome />} />
        <Route path="/products/allproducts" element={<Allproducts />} />
        <Route path="/products/addproducts" element={<Addproducts />} />
        <Route path="/products/categories" element={<Categories />} />
        <Route path="/orders/allorders" element={<Allorders />} />
        <Route path="/users/allusers" element={<Allusers />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;
