// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider
import { store } from './store'; // Import your Redux store
import Header from './components/Header';
import Navbar from './components/Navbar';
import { Footer } from './components/Footer';
import Home from './components/Home';
import Catalog from './components/Catalog';
import Product from './components/Product';
import CategoryProducts from './components/CategoryProducts';
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/Cart';
import AdminDashboard from './components/admin/AdminDashboard';
import UserDashboard from './components/users/UserDashboard';
import Signin from './components/Signin';
import { ErrorPage } from './components/ErrorPage';

const DefaultLayout = ({ children }) => (
  <>
    <Header />
    <Navbar />
    {children}
    <Footer />
  </>
);

export default function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
        <Route path="/catalog" element={<DefaultLayout><Catalog /></DefaultLayout>} />
        <Route path="/product/:id" element={<DefaultLayout><Product /></DefaultLayout>} />
        <Route path="/category/:slug" element={<DefaultLayout><CategoryProducts /> </DefaultLayout>} />
        <Route path="/about" element={<DefaultLayout><About /></DefaultLayout>} />
        <Route path="/contact" element={<DefaultLayout><Contact /></DefaultLayout>} />
        <Route path="/cart" element={<DefaultLayout><Cart /></DefaultLayout>} />
        <Route path="/signin" element={<DefaultLayout><Signin /></DefaultLayout>} />
        <Route path="*" element={<DefaultLayout><ErrorPage /></DefaultLayout>} />
        {/* User Dashboard */}
        <Route path="/users/*" element={<DefaultLayout><UserDashboard /></DefaultLayout>} />

        {/* Admin Dashboard */}
        <Route path="/admin/*" element={<AdminDashboard />} />
        
      </Routes>
      </Provider>
  );
}
