// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Home, ShoppingBag, List } from 'lucide-react'; // Import additional icons as needed

// const AdminSidebar = () => {
//   const [openSubMenu, setOpenSubMenu] = useState(null);

//   const dashNav = [
//     {
//       label: 'Dashboard',
//       icon: <Home className="h-5 w-5" />,
//       to: '/admin/products',
//       subMenu: [
//         { label: 'Home', to: '/admin/home' },
//       ],
//     },
//     {
//       label: 'Products',
//       icon: <ShoppingBag className="h-5 w-5" />,
//       to: '/admin/products',
//       subMenu: [
//         { label: 'Products', to: '/admin/products/allproducts' },
//         { label: 'Categories', to: '/admin/products/categories' },
//       ],
//     },
//     {
//       label: 'Orders',
//       icon: <List className="h-5 w-5" />,
//       to: '/admin/orders',
//       subMenu: [
//         { label: 'All Orders', to: '/admin/orders/allorders' },
//         // Add more order-related submenu items as needed
//       ],
//     },
//     {
//       label: 'Users',
//       icon: <List className="h-5 w-5" />,
//       to: '/admin/users',
//       subMenu: [
//         { label: 'All Users', to: '/admin/users/allusers' },
//         // Add more order-related submenu items as needed
//       ],
//     },
//     {
//       label: 'Uploads',
//       icon: <List className="h-5 w-5" />,
//       to: '/admin/uploads',
//       subMenu: [
//         { label: 'Upload Media', to: '/admin/uploads/newmedia' },
//         { label: 'Media Library', to: '/admin/uploads/medialibrary' },
//         // Add more order-related submenu items as needed
//       ],
//     },
//   ];

//   const handleSubMenuToggle = (index) => {
//     setOpenSubMenu(openSubMenu === index ? null : index);
//   };

//   return (
//     <aside className="flex h-screen w-50 flex-col overflow-y-auto border-r bg-black px-5 py-8">
//       <div className="mt-6 flex flex-1 flex-col justify-between">
//         <nav className="-mx-3 space-y-6">
//           <div className="space-y-3">
//             {dashNav.map((item, index) => (
//               <div key={index} className="group">
//                 <div
//                   className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700 cursor-pointer relative"
//                   onClick={() => handleSubMenuToggle(index)}
//                 >
//                   {item.icon}
//                   <Link to={item.to} className="mx-2 text-sm font-medium">{item.label}</Link>
//                 </div>
//                 <div
//                   className={`ml-3+ ${openSubMenu === index ? 'block' : 'hidden'}`}
//                 >
//                   {item.subMenu && item.subMenu.length > 0 && (
//                     item.subMenu.map((subItem, subIndex) => (
//                       <Link
//                         key={subIndex}
//                         className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
//                         to={subItem.to}
//                       >
//                         {subItem.icon}
//                         <span className="mx-2 text-sm font-medium">{subItem.label}</span>
//                       </Link>
//                     ))
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </nav>
//       </div>
//     </aside>
//   );
// };

// export default AdminSidebar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag, List, Menu } from 'lucide-react'; // Import Menu icon for toggle button

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // State for toggling sidebar
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
        { label: 'Products', to: '/admin/products/allproducts' },
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
    {
      label: 'Uploads',
      icon: <List className="h-5 w-5" />,
      to: '/admin/uploads',
      subMenu: [
        { label: 'Upload Media', to: '/admin/uploads/newmedia' },
        { label: 'Media Library', to: '/admin/uploads/medialibrary' },
        // Add more order-related submenu items as needed
      ],
    },
  ];

  const handleSubMenuToggle = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={`flex ${isOpen ? 'w-64' : 'w-16'} h-auto z-50 min-h-screen flex-col overflow-y-auto border-r bg-black px-5 py-8 transition-all duration-300`}>
      <div className="flex justify-between items-center mb-6">
        <button onClick={handleSidebarToggle} className="text-gray-200 hover:text-gray-700">
          <Menu className="h-6 w-6" />
        </button>
        {isOpen && <span className="text-white text-lg font-semibold">Admin Panel</span>}
      </div>
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6">
          <div className="space-y-3">
            {dashNav.map((item, index) => (
              <div key={index} className="group">
                <div
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700 cursor-pointer relative"
                  onClick={() => handleSubMenuToggle(index)}
                >
                  {item.icon}
                  {isOpen && <Link to={item.to} className="mx-2 text-sm font-medium">{item.label}</Link>}
                </div>
                <div
                  className={`ml-3 ${openSubMenu === index && isOpen ? 'block' : 'hidden'}`}
                >
                  {item.subMenu && item.subMenu.length > 0 && (
                    item.subMenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
                        to={subItem.to}
                      >
                        {subItem.icon}
                        {isOpen && <span className="mx-2 text-sm font-medium">{subItem.label}</span>}
                      </Link>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;

