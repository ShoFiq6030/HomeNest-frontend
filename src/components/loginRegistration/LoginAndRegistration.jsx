import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaTimes, FaGoogle } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { photoUploadToCloudinary } from "../../utils/uploadImgToCloudinary";
import { useTheme } from "../../hooks/useTheme";

// Helper component for Form Inputs

const FormInput = ({ label, type = "text", id }) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label} <span className="text-red-500">*</span>
      {id === "password" && (
        <span>(uppercase, lowercase and 6 characters) </span>
      )}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all"
      placeholder={`Enter your ${label.split(" ")[0].toLowerCase()}`}
    />
  </div>
);

/**
 * Main Login Modal Component
 */
export default function LoginAndRegistration({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, setUser, login, logout, authLoading, googleSignin } = useAuth();
  const { theme } = useTheme();

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/login`,
        { email, password }
      );

      if (res.status === 200) {
        toast.success("Login successful:");
        // localStorage.setItem("token", res.data.token);
        const token = res.data.token;
        const user = res.data.user;
        login(token, user);

        // console.log(res);
        onClose();
      }
    } catch (err) {
      console.error("login error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Please check your credentials.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await googleSignin();
      const user = result.user;

      // console.log(user);
      // Get Firebase-issued ID token (verified JWT from Google)
      const idToken = await user.getIdToken();
      // console.log(idToken);

      // Send it to your backend for verification + DB entry
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/google-login`,
        {
          firebaseToken: idToken,
        }
      );

      // Backend returns your app's token and user data
      // console.log(res);

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      toast.success("google login successful ");
      onClose();
      // console.log("Google login successful:", res.data);
    } catch (err) {
      console.error("Google login error:", err);
      const msg =
        err?.response?.data?.message || err?.message || "Google login failed!";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoFile = e.target.photo.files[0];
    const password = e.target.password.value;
    // console.log(photoFile);
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, and be at least 6 characters long."
      );
      return;
    }
    setError(null);

    setLoading(true);

    try {
      // Upload photo to Cloudinary
      let photoURL;
      if (photoFile) {
        photoURL = await photoUploadToCloudinary(photoFile);
        // console.log("Uploaded photo URL:", photoURL);
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/signup`,
        { name, email, password, photoURL }
      );

      if (res.status === 201) {
        toast.success("Signup successful:");
        // localStorage.setItem("token", res.data.token);
        // const token = res.data.token;
        // const user = res.data.user;
        // login(token, user);

        // console.log(res);
        // onClose();
        setActiveTab("login");
      }
    } catch (err) {
      console.error("login error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Please check your credentials.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };
  // console.log(error);
  return (
    // 1. Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose} // Close modal if clicking outside the content
    >
      {/* 2. Modal Content */}
      <div
        className={`relative  ${
          theme === "dark" ? "bg-gray-400 " : "bg-white"
        } w-full max-w-md p-8 rounded-lg shadow-xl`}
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
          <button
            className="btn bg-white text-black border-[#e5e5e5]"
            onClick={handleGoogleSignin}
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
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
            <form onSubmit={handleLoginSubmit}>
              <FormInput label="Email Address" id="email" />
              <FormInput label="Password" type="password" id="password" />

              {error && <p className="text-red-700 text-sm mt-2">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-600 text-white py-3 rounded-md font-semibold hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  " Log In"
                )}
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
            <form onSubmit={handleSignupSubmit} className="text-gray-700">
              <FormInput label="Name" id="name" />
              <FormInput label="Email Address" id="email" />
              <fieldset className="fieldset pb-4">
                <legend className="fieldset-legend">
                  Photo<span className="text-red-500">*</span>
                </legend>
                <input
                  type="file"
                  className="file-input"
                  name="photo"
                  accept="image/*"
                  required
                />
                <label className="label">Max size 2MB</label>
              </fieldset>

              <FormInput label="Password" type="password" id="password" />
              {error && <p className="text-red-500"> {error}</p>}

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-pink-600 text-white py-3 rounded-md font-semibold hover:bg-pink-700 transition-colors ${
                  loading && "cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Register"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
