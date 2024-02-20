// AdminDashboard.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import AdminHome from './AdminHome';
import Allproducts from './products/Allproducts';
import Addproducts from './products/Addproducts';
import Categories from './products/Categories';
import Allorders from './orders/Allorders';
import Allusers from './users/Allusers';

const AdminDashboard = () => {
  // const navigate = useNavigate();
  // const { loginUser, setLoginUser } = useData();
  // const isLoggedIn = loginUser !== null && loginUser !== undefined; // Modify this based on your login logic
  // const isAdmin = loginUser && loginUser.userRole === 'Administrator'; // Modify this based on your role logic
  // console.log(loginUser);

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate('/signin');
  //   } else if (!isAdmin) {
  //     // If the user is not an admin, navigate to the user's account route
  //     navigate('/users/account');
  //   }
  // }, [isLoggedIn, isAdmin, navigate]);

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