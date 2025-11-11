import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaTimes, FaGoogle } from "react-icons/fa";

/**
 * Helper component for Social Login Buttons
 */
const SocialButton = ({ icon, text, bgColor }) => (
  <button
    className={`flex items-center justify-center w-full py-3 rounded-md  font-semibold ${bgColor} hover:opacity-90 transition-opacity`}
  >
    {icon}
    <span className="ml-2">{text}</span>
  </button>
);

/**
 * Helper component for Form Inputs
 */
const FormInput = ({ label, type = "text", id }) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      type={type}
      id={id}
      className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all"
      placeholder={`Enter your ${label.split(" ")[0].toLowerCase()}`}
    />
  </div>
);

/**
 * Main Login Modal Component
 */
export default function LoginAndRegistration({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("login");

  // Don't render anything if the modal is not open
  if (!isOpen) return null;

  return (
    // 1. Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose} // Close modal if clicking outside the content
    >
      {/* 2. Modal Content */}
      <div
        className="relative bg-white w-full max-w-md p-8 rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside
      >
        {/* 3. Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
          aria-label="Close modal"
        >
          <FaTimes />
        </button>

        {/* 4. Header */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          Welcome to <span className="text-pink-500">HomeNest</span>
        </h2>

        {/* 5. Social Logins */}
        
        <div className="flex flex-col gap-3">
          <SocialButton
            icon={<FaGoogle />}
            text="Log in with Google"
            bgColor="bg-gray-200"
          />
          {/* <SocialButton
            icon={<FaTwitter />}
            text="Log in with Twitter"
            bgColor="bg-sky-500"
          /> */}
        </div>

        {/* 6. "Or" Separator */}
        <div className="flex items-center my-6">
          <hr className="grow border-gray-300" />
          <span className="mx-4 text-gray-500 font-medium">Or</span>
          <hr className="grow border-gray-300" />
        </div>

        {/* 7. Tab Buttons */}
        <div className="flex items-center gap-2 mb-6 border-b border-b-pink-400">
          <button
            onClick={() => setActiveTab("login")}
            className={`py-2 px-6 font-semibold  transition-colors ${
              activeTab === "login"
                ? "bg-pink-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`py-2 px-6 font-semibold  transition-colors ${
              activeTab === "register"
                ? "bg-pink-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Register
          </button>
        </div>

        {/* 8. Tab Content */}
        <div>
          {/* Login Form */}
          {activeTab === "login" && (
            <form onSubmit={(e) => e.preventDefault()}>
              <FormInput label="Email Address" id="username" />
              <FormInput label="Password" type="password" id="password" />

              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-3 rounded-md font-semibold hover:bg-pink-700 transition-colors"
              >
                Log In
              </button>

              <div className="flex justify-between items-center mt-4 text-sm">
                <label className="flex items-center text-gray-600 select-none">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <a href="#" className="text-red-500 hover:underline">
                  Lost Your Password?
                </a>
              </div>
            </form>
          )}

          {/* Register Form (Placeholder) */}
          {activeTab === "register" && (
            <form
              onSubmit={(e) => e.preventDefault()}
              className="text-gray-700"
            >
                <FormInput label="Username" id="reg_username" />
              <FormInput label="Email Address" id="reg_email" />
             
              <FormInput label="Password" type="password" id="reg_password" />

              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-3 rounded-md font-semibold hover:bg-pink-700 transition-colors"
              >
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
