import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdArrowDropright, IoMdClose } from "react-icons/io";
import axios from "axios";

const Navbar = () => {
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [defaultCategory] = useState("Bedroom");

  // Define navItems here
  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Catalog', to: '/catalog' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Cart', to: '/cart' },
  ];

  // Fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/categories');
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const closeSubMenu = () => {
    setDesktopMenuOpen(false);
    setSelectedCategory(null);
  };

  const openDesktopMenu = () => {
    setDesktopMenuOpen((prev) => !prev);
    setSelectedCategory(defaultCategory);
  };

  const getCategoryMenu = (category) => {
    if (!category) {
      console.warn('Category is undefined');
      return null;
    }
  
    // Find child categories
    const childCategories = categories.filter(cat => cat.categoryParentCategory?._id === category._id);
  
    return (
      <div className="flex flex-col gap-6">
        {childCategories.length > 0 && (
          <div className="mx-5">
            <p className="font-medium text-gray-500">Subcategories</p>
            <ul className="leading-8 text-sm">
              {childCategories.map((childCategory) => (
                <li key={childCategory._id} className="ml-4">
                  <Link to={`/category/${childCategory.categorySlug}`}>
                    {childCategory.categoryName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <nav className="md:block hidden relative bg-violet-900">
        <div className="mx-auto h-12 w-full max-w-[1200px] items-center md:flex">
          <button
            onClick={openDesktopMenu}
            className="ml-5 flex h-full w-40 cursor-pointer items-center justify-center bg-amber-400"
          >
            <div className="flex justify-around">
              <RxHamburgerMenu className="mx-1 w-6 h-6" />
              All categories
            </div>
          </button>
          <div className="mx-7 flex gap-8">
            {/* Render nav items */}
            {navItems.map((item, index) => (
              <Link
                key={index}
                className="font-light text-white duration-100 hover:text-yellow-400 hover:underline"
                to={item.to}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="ml-auto flex gap-4 px-5">
            <Link
              className="font-light text-white duration-100 hover:text-yellow-400 hover:underline"
              to="/signin"
            >
              Login
            </Link>
            <span className="text-white">|</span>
            <Link
              className="font-light text-white duration-100 hover:text-yellow-400 hover:underline"
              to="/sign-up"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
      {desktopMenuOpen && (
        <section
          className={`absolute left-0 right-0 z-10 w-full border-b border-r border-l bg-white ${
            desktopMenuOpen ? "block" : "none"
          }`}
        >
          <div className="hidden mx-auto md:flex max-w-[1200px] py-10">
            <div className="w-[300px] border-r">
              <ul className="px-5">
                {Array.isArray(categories) && categories
                  .filter(category => !category.categoryParentCategory) // Filter top-level categories
                  .map((category, index) => (
                    <li
                      key={index}
                      className={`${
                        selectedCategory === category.categoryName
                          ? "bg-amber-400"
                          : ""
                      } flex items-center gap-2 py-2 px-3 hover:bg-neutral-200 cursor-pointer`}
                      onClick={() =>
                        setSelectedCategory(
                          selectedCategory === category.categoryName
                            ? null
                            : category.categoryName
                        )
                      }
                    >
                      {category.icon}
                      {category.categoryName}
                      <span className="ml-auto">
                        <IoMdArrowDropright className="h-4 w-4" />
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="flex w-full justify-between">
              {selectedCategory && (
                getCategoryMenu(
                  categories.find(cat => cat.categoryName === selectedCategory)
                )
              )}
            </div>
            <button onClick={closeSubMenu} className="absolute top-5 right-5">
              <IoMdClose className="w-6 h-6" />
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default Navbar;
