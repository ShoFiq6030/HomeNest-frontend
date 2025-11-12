import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router";
import { FaBars, FaTimes, FaChevronDown, FaPlus } from "react-icons/fa";

import { toast } from "react-toastify";
import { AuthContext } from "./../../provider/AuthProvider";
import LoginAndRegistration from "../loginRegistration/LoginAndRegistration";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "All Properties", path: "/all-properties" },
    { name: "Add Property", path: "/add-property", private: true },
    { name: "My Properties", path: "/my-properties", private: true },
    { name: "My Ratings", path: "/my-ratings", private: true },
  ];

  return (
    <nav className="w-full bg-white shadow-md  sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <LoginAndRegistration
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        {/* ✅ Logo */}
        <Link to="/" className="flex items-center space-x-2">
          {/* <img src="/logo.png" alt="logo" className="h-8 w-8" /> */}
          <span className="font-bold text-xl text-gray-800">HomeNest</span>
        </Link>

        {/* ✅ Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          {navItems.map((item) =>
            !item.private || (item.private && user) ? (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `hover:text-pink-600 transition ${
                      isActive ? "text-pink-600" : ""
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ) : null
          )}
        </ul>

        {/* ✅ Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            // 🔹 Show Login / Signup
            <div
              className="flex items-center gap-4"
              onClick={() => setIsModalOpen(true)}
            >
              <button className="text-gray-700 hover:text-pink-600 transition">
                Login
              </button>
              <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition">
                Sign Up
              </button>
            </div>
          ) : (
            // 🔹 Logged-in dropdown
            <div className="relative group">
              <div className="flex items-center space-x-2 cursor-pointer">
                <img
                  src={user.photoURL || "https://i.pravatar.cc/40"}
                  alt="User"
                  className="h-9 w-9 rounded-full border"
                />
                <FaChevronDown
                  size={12}
                  className="text-gray-600 group-hover:rotate-180 transition-transform"
                />
              </div>
              <div className="absolute right-0 mt-3 hidden group-hover:block bg-white rounded-lg shadow-md border w-48 p-3 text-sm">
                <p className="font-medium text-gray-800 truncate">
                  {user.displayName || "User"}
                </p>
                <p className="text-gray-500 text-xs mb-2 truncate">
                  {user.email}
                </p>
                <hr className="my-2" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-600 hover:text-red-700 font-medium"
                >
                  Log out
                </button>
              </div>
            </div>
          )}

          {/* ✅ Add Property Button (always visible for logged in users) */}
          {user && (
            <Link
              to="/add-property"
              className="flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
            >
              <FaPlus />
              <span>Add Property</span>
            </Link>
          )}
        </div>

        {/* ✅ Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 text-2xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ✅ Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-inner">
          <ul className="flex flex-col px-6 py-3 text-gray-700 font-medium space-y-3">
            {navItems.map((item) =>
              !item.private || (item.private && user) ? (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="block hover:text-pink-600 transition"
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}

            <hr className="my-2" />

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-pink-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2">
                  <img
                    src={user.photoURL || "https://i.pravatar.cc/30"}
                    alt="User"
                    className="h-8 w-8 rounded-full border"
                  />
                  <span>{user.displayName || "User"}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-red-600 font-medium text-left"
                >
                  Log out
                </button>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
