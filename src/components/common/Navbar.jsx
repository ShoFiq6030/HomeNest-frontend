import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router";
import { FaBars, FaTimes, FaChevronDown, FaPlus, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import LoginAndRegistration from "../loginRegistration/LoginAndRegistration";
import { useAuth } from "../../hooks/useAuth";
import AddPropertyModal from "./AddPropertyModal";
import { useLoginModal } from "./../../hooks/useLoginModal";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTheme } from "../../hooks/useTheme";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, authLoading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);
  const [showUserDropDown, setShowUserDropDown] = useState(false);
  const [showSectionsDropDown, setShowSectionsDropDown] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  const { openLoginModal, setOpenLoginModal } = useLoginModal();
  const { theme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "All Properties", path: "/all-properties" },
    // protected routes shown only when logged in
    { name: "My Properties", path: "/my-properties", private: true },
    { name: "My Ratings", path: "/my-ratings", private: true },
  ];

  // Links for homepage sections (anchor links)
  const homeSectionLinks = [
    { name: "Feature Properties", href: "/#feature-properties" },
    { name: "Properties for Sale", href: "/#properties-for-sale" },
    { name: "Most Popular Places", href: "/#most-popular-places" },
    { name: "Why Choose Us", href: "/#why-choose-us" },
    { name: "Contact Us", href: "/#contact-us" },
  ];

  const handleAddPropertyModal = () => {
    setIsAddPropertyModalOpen(!isAddPropertyModalOpen);
  };

  // Dropdown refs and outside-click + keyboard handling for both dropdowns
  const dropdownRef = React.useRef(null);
  const exploreBtnRef = React.useRef(null);
  const userDropdownRef = React.useRef(null);
  const userBtnRef = React.useRef(null);
  const location = useLocation();

  useEffect(() => {
    function onDocClick(e) {
      // Sections dropdown
      if (dropdownRef.current) {
        if (
          dropdownRef.current.contains(e.target) ||
          exploreBtnRef.current?.contains(e.target)
        ) {
          // click inside sections dropdown or its button - do nothing
        } else {
          setShowSectionsDropDown(false);
        }
      }

      // User dropdown
      if (userDropdownRef.current) {
        if (
          userDropdownRef.current.contains(e.target) ||
          userBtnRef.current?.contains(e.target)
        ) {
          // click inside user dropdown or its button - do nothing
        } else {
          setShowUserDropDown(false);
        }
      }
    }

    function onKeyDown(e) {
      if (e.key === "Escape") {
        setShowSectionsDropDown(false);
        setShowUserDropDown(false);
      }
    }

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const handleNavigateToSection = (href) => {
    const parts = href.split("#");
    const hash = parts[1];
    setShowSectionsDropDown(false);
    if (!hash) return;

    // If we're already on the homepage, smooth scroll; otherwise navigate to home with hash
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    // Navigate to home with hash so router can update URL
    navigate(`/#${hash}`);
  };

  return (
    <nav
      className={`w-full  ${
        theme == "dark" ? "bg-gray-500" : "bg-white"
      } shadow-md  sticky top-0 z-50`}
    >
      {isAddPropertyModalOpen && (
        <AddPropertyModal onClose={() => setIsAddPropertyModalOpen(false)} />
      )}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {openLoginModal && (
          <LoginAndRegistration
            isOpen={openLoginModal}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onClose={() => setOpenLoginModal(false)}
          />
        )}

        {/* ✅ Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="logo" className="h-12 " />
          {/* <span className="font-bold text-xl text-gray-800">HomeNest</span> */}
        </Link>

        {/* ✅ Desktop Menu */}
        <ul
          className={`hidden md:flex items-center space-x-6 ${
            theme === "dark" ? "text-white" : "text-gray-700"
          }  font-medium`}
        >
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

          {/* Desktop-only dropdown for homepage sections (md and up) */}
          <li className="relative">
            <button
              ref={exploreBtnRef}
              onClick={() => setShowSectionsDropDown((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={showSectionsDropDown}
              className={`flex items-center gap-2 transition ${
                theme === "dark"
                  ? "text-white hover:text-pink-300"
                  : "text-gray-700 hover:text-pink-600"
              }`}
            >
              Explore
              <FaChevronDown
                size={12}
                className={`transition-transform ${
                  showSectionsDropDown ? "rotate-180" : ""
                } ${theme === "dark" ? "text-white" : "text-gray-600"}`}
              />
            </button>

            <div
              ref={dropdownRef}
              role="menu"
              aria-hidden={!showSectionsDropDown}
              className={`absolute left-0 mt-2 rounded-md shadow-md w-56 p-3 text-sm z-50 transform origin-top transition-all duration-200 ${
                showSectionsDropDown
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
              } ${
                theme === "dark"
                  ? "bg-gray-700 text-white border border-gray-600"
                  : "bg-white text-gray-700 border"
              }`}
            >
              {homeSectionLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigateToSection(link.href);
                  }}
                  className={`block py-2 ${
                    theme === "dark"
                      ? "text-white hover:text-pink-300"
                      : "text-gray-700 hover:text-pink-600"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </li>
        </ul>

        {/* ✅ Right Side */}
        <div className="flex">
          <div className="mx-5">
            {" "}
            <ThemeSwitcher />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {!authLoading && !user ? (
              // 🔹 Show Login / Signup
              <div
                className="flex items-center gap-4"
                onClick={() => setOpenLoginModal(true)}
              >
                <button
                  onClick={() => setActiveTab("login")}
                  className={` ${
                    theme === "dark" ? "text-white" : "text-gray-700"
                  } hover:text-pink-600 transition`}
                >
                  Login
                </button>

                <button
                  onClick={() => setActiveTab("register")}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              // 🔹 Logged-in dropdown
              <div className="relative">
                <div
                  ref={userBtnRef}
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => setShowUserDropDown((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={showUserDropDown}
                >
                  {user?.photoURL ? (
                    <img
                      src={user?.photoURL || "https://i.pravatar.cc/40"}
                      alt="User"
                      className="h-9 w-9 rounded-full border"
                    />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center bg-pink-100 rounded-full">
                      <FaUser className="text-pink-600 text-xl" />
                    </div>
                  )}

                  <FaChevronDown
                    size={12}
                    className={`transition-transform ${
                      showUserDropDown ? "rotate-180" : ""
                    } ${theme === "dark" ? "text-white" : "text-gray-600"}`}
                  />
                </div>

                <div
                  ref={userDropdownRef}
                  role="menu"
                  aria-hidden={!showUserDropDown}
                  className={`absolute right-0 mt-3 rounded-lg shadow-md w-48 p-3 text-sm transform origin-top transition-all duration-200 ${
                    showUserDropDown
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                  } ${
                    theme === "dark"
                      ? "bg-gray-700 text-white border border-gray-600"
                      : "bg-white text-gray-700 border"
                  }`}
                >
                  <Link
                    to={`/profile/${user?.id}`}
                    className="font-medium truncate cursor-pointer hover:underline"
                    onClick={() => setShowUserDropDown(false)}
                  >
                    {user?.name || "User"}
                  </Link>

                  <p className="text-gray-500 text-xs mb-2 truncate">
                    {user?.email}
                  </p>

                  <hr className="my-2" />

                  <button
                    onClick={() => {
                      setShowUserDropDown(false);
                      handleLogout();
                    }}
                    className="w-full text-left text-red-600 hover:text-red-700 font-medium cursor-pointer"
                  >
                    Log out
                  </button>
                </div>
              </div>
            )}

            {/* ✅ Add Property Button (always visible for logged in users) */}
            {user && (
              <button
                className="flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
                onClick={handleAddPropertyModal}
              >
                <FaPlus />
                <span>Add Property</span>
              </button>
            )}
          </div>
        </div>

        {/* ✅ Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden text-2xl ${
            theme === "dark" ? "text-white" : "text-gray-700"
          }`}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ✅ Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          className={`md:hidden ${
            theme === "dark"
              ? "bg-gray-800 border-t border-gray-700 shadow-inner"
              : "bg-white border-t shadow-inner"
          }`}
        >
          <ul className="flex flex-col px-6 py-3 text-gray-700 font-medium space-y-3">
            {navItems.map((item) =>
              !item.private || (item.private && user) ? (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
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

            {/* Mobile: show homepage section links directly (no dropdown) */}
            <li className="pt-2 border-t mt-2">
              <p className="text-sm font-medium text-gray-600 mb-2">Explore</p>
              <ul className="flex flex-col gap-2">
                {homeSectionLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setMenuOpen(false);
                        handleNavigateToSection(link.href);
                      }}
                      className={`transition ${
                        theme === "dark"
                          ? "text-white hover:text-pink-300"
                          : "hover:text-pink-600 text-gray-700"
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            {user && (
              <button
                className="flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 max-w-40 rounded-lg hover:bg-pink-700 transition"
                onClick={handleAddPropertyModal}
              >
                <FaPlus />
                <span>Add Property</span>
              </button>
            )}

            <hr className="my-2" />

            {!user ? (
              <div
                className="flex flex-col gap-4"
                onClick={() => setOpenLoginModal(true)}
              >
                <button
                  className="text-gray-700 hover:text-pink-600"
                  onClick={() => setActiveTab("login")}
                >
                  Login
                </button>
                <button
                  onClick={() => setActiveTab("register")}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-2 cursor-pointer hover:underline">
                  <img
                    src={user.photoURL || "https://i.pravatar.cc/30"}
                    alt="User"
                    className="h-8 w-8 rounded-full border"
                  />
                  <Link to={`/profile/${user._id}`}>{user.name || "User"}</Link>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-red-600 font-medium text-left cursor-pointer"
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
