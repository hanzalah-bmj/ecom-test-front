import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiHeart, CiSearch, CiUser } from "react-icons/ci";
import { IoBagHandleSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { text: "Home", url: "/" },
    { text: "Catalog", url: "/catalog" },
    { text: "About Us", url: "/about" },
    { text: "Contact Us", url: "/contact" },
  ];

  const iconLinks = [
    {
      to: "/wishlist",
      icon: <CiHeart className="h-6 w-6" />,
      text: "Wishlist",
    },
    {
      to: "/cart",
      icon: <IoBagHandleSharp className="h-6 w-6" />,
      text: "Cart",
    },
    {
      to: "/account",
      icon: <CiUser className="h-6 w-6" />,
      text: "Account",
    },
  ];

  return (
    <>
      <header className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5">
        <Link to="/" className="w-24">
          <img
            className="cursor-pointer sm:h-auto sm:w-auto"
            src="https://i.imgur.com/520zDfd.png"
            alt="company logo"
          />
        </Link>
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <RxHamburgerMenu className="w-8 h-8" />
          </button>
        </div>
        <form className="hidden h-9 w-2/5 items-center border md:flex">
          <CiSearch className="mx-3 h-4 w-4" />
          <input
            className="hidden w-11/12 outline-none md:block"
            type="search"
            placeholder="Search"
          />
          <button className="ml-auto h-full bg-amber-400 px-4 hover:bg-yellow-300">
            Search
          </button>
        </form>
        <div className="hidden gap-3 md:!flex">
          {iconLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="flex cursor-pointer flex-col items-center justify-center"
            >
              {link.icon}
              <p className="text-xs">{link.text}</p>
            </Link>
          ))}
        </div>
      </header>
      {mobileMenuOpen && (
        <section
          className={`block md:hidden absolute left-0 right-0 z-50 h-screen w-full bg-white ${
            mobileMenuOpen ? "none" : "block"
          }`}
        >
          <div className="mx-auto">
            <div className="mx-auto flex w-full justify-center gap-3 py-4">
              {iconLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="flex cursor-pointer flex-col items-center justify-center"
                >
                  {link.icon}
                  <p className="text-xs">{link.text}</p>
                </Link>
              ))}
            </div>
            <form className="my-4 mx-5 flex h-9 items-center border">
              <CiSearch className="mx-3 h-4 w-4" />
              <input
                className="hidden w-11/12 outline-none md:block"
                type="search"
                placeholder="Search"
              />
              <button
                type="submit"
                className="ml-auto h-full bg-amber-400 px-4 hover:bg-yellow-300"
              >
                Search
              </button>
            </form>
            <ul className="text-center font-medium">
              {links.map((link, index) => (
                <li key={index} className="py-2">
                  <Link to={link.url}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
};

export default Header;