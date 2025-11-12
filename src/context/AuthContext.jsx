import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
export const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // On mount → check localStorage token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Decode or validate token here if needed
      fetchUserProfile(token);
    } else {
      setAuthLoading(false);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/token/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      logout();
    } finally {
      setAuthLoading(false);
    }
  };

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
