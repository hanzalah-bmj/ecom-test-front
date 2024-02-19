import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, BarChart, ShoppingBag, List } from 'lucide-react'; // Import additional icons as needed

const AdminSidebar = () => {
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const dashNav = [
    {
      label: 'Dashboard',
      icon: <Home className="h-5 w-5" />,
      to: '/admin/products',
      subMenu: [
        { label: 'Home', to: '/admin/home' },
      ],
    },
    {
      label: 'Products',
      icon: <ShoppingBag className="h-5 w-5" />,
      to: '/admin/products',
      subMenu: [
        { label: 'All Products', to: '/admin/products/allproducts' },
        { label: 'Add Products', to: '/admin/products/addproducts' },
        { label: 'Categories', to: '/admin/products/categories' },
      ],
    },
    {
      label: 'Orders',
      icon: <List className="h-5 w-5" />,
      to: '/admin/orders',
      subMenu: [
        { label: 'All Orders', to: '/admin/orders/allorders' },
        // Add more order-related submenu items as needed
      ],
    },
    {
      label: 'Users',
      icon: <List className="h-5 w-5" />,
      to: '/admin/users',
      subMenu: [
        { label: 'All Users', to: '/admin/users/allusers' },
        // Add more order-related submenu items as needed
      ],
    },
  ];

  const handleSubMenuToggle = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  return (
    <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-black px-5 py-8">
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6">
          <div className="space-y-3">
            {dashNav.map((item, index) => (
              <div key={index} className="group">
                <div
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
                  onClick={() => handleSubMenuToggle(index)}
                >
                  {item.icon}
                  <span className="mx-2 text-sm font-medium">{item.label}</span>
                </div>
                {openSubMenu === index && item.subMenu && item.subMenu.length > 0 && (
                  <div className="space-y-2 ml-8">
                    {item.subMenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
                        to={subItem.to}
                      >
                        {subItem.icon}
                        <span className="mx-2 text-sm font-medium">{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
