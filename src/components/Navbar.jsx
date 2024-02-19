import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdArrowDropright, IoMdClose } from "react-icons/io";
import { FaBed } from "react-icons/fa";
import { TbToolsKitchen3 } from "react-icons/tb";
import { MdOutdoorGrill } from "react-icons/md";

const Navbar = () => {
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [defaultCategory, setDefaultCategory] = useState("Bedroom");
  const navItems = [
    { label: "Home", to: "/" },
    { label: "Catalog", to: "/catalog" },
    { label: "About US", to: "/about" },
    { label: "Contact US", to: "/contact" },
  ];

  const categories = [
    {
      category: "Bedroom",
      icon: <FaBed />,
      menu: [
        {
          title: "Bedroom",
          items: [
            {
              label: "Luxurious Italian Bed",
              to: "",
            },
            { label: "Elegant Queen-size Bed", to: "" },
            {
              label: "Artisan Wooden Craft Bed",
              to: "",
            },
            { label: "Royal King-size Bed", to: "" },
          ],
        },
        {
          title: "BEDS",
          items: [
            { label: "Classic Italian Bed", to: "" },
            { label: "Regal Queen-size Bed", to: "" },
            { label: "Handcrafted Wooden Bed", to: "" },
            { label: "Majestic King-size Bed", to: "" },
          ],
        },
      ],
    },
    {
      category: "Outdoor",
      icon: <MdOutdoorGrill />,

      menu: [
        {
          title: "outdoor",
          items: [
            {
              label: "Sleek Italian Outdoor Bed",
              to: "",
            },
            { label: "Outdoor Queen-size Bed", to: "" },
            {
              label: "Natural Wooden Craft Bed",
              to: "",
            },
            {
              label: "Innovative King-size Outdoor Bed",
              to: "new-",
            },
          ],
        },
        {
          title: "LAMPS",
          items: [
            {
              label: "Vibrant Italian Purple Lamp",
              to: "",
            },
            { label: "High-tech APEX Lamp", to: "" },
            { label: "Modern PIXAR Lamp", to: "" },
            { label: "Ambient Nightlamp", to: "" },
          ],
        },
      ],
    },
    {
      category: "Kitchen",
      icon: <TbToolsKitchen3 />,
      menu: [
        {
          title: "kitchen",
          items: [
            { label: "Gourmet Italian Bed", to: "" },
            { label: "Designer Queen-size Bed", to: "" },
            {
              label: "Premium Wooden Craft Bed",
              to: "",
            },
            { label: "Modern King-size Bed", to: "" },
          ],
        },
        {
          title: "SPECIAL",
          items: [
            { label: "Aromatherapy Humidifier", to: "" },
            { label: "Advanced Bed Cleaner", to: "" },
            { label: "Smart Vacuum Cleaner", to: "" },
            { label: "Plush Pillow", to: "" },
          ],
        },
      ],
    },
  ];

  const closeSubMenu = () => {
    setDesktopMenuOpen(false);
    setSelectedCategory(null);
  };

  const openDesktopMenu = () => {
    setDesktopMenuOpen((prev) => !prev);
    setSelectedCategory(defaultCategory);
  };

  return (
    <>
      <nav className="md:block hidden relative bg-violet-900">
        <div className="mx-auto  h-12 w-full max-w-[1200px] items-center md:flex">
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
          x-show="desktopMenuOpen"
          className={`absolute left-0 right-0 z-10 w-full border-b border-r border-l bg-white ${
            desktopMenuOpen ? "none" : "block"
          } `}
        >
          <div className="hidden mx-auto md:flex max-w-[1200px] py-10">
            <div className="w-[300px] border-r">
              <ul className="px-5">
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className={`${
                      selectedCategory === category.category
                        ? "active:blue-900 bg-amber-400"
                        : ""
                    } flex items-center gap-2 py-2 px-3 hover:bg-neutral- `}
                    onClick={() =>
                      setSelectedCategory(
                        selectedCategory === category.category
                          ? null
                          : category.category
                      )
                    }
                  >
                    {category.icon}
                    {category.category}
                    <span className="ml-auto">
                      <IoMdArrowDropright className="h-4 w-4" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex w-full justify-between">
              {selectedCategory && (
                <div className="flex gap-6">
                  {categories
                    .find((category) => category.category === selectedCategory)
                    ?.menu.map((submenu, index) => (
                      <div key={index} className="mx-5">
                        <p className="font-medium text-gray-500">
                          {submenu.title}
                        </p>
                        <ul className="leading-8 text-sm">
                          {submenu.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <Link to={item.to}>{item.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
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
