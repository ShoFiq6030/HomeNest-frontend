import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  let logoutUser;
  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
    
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
