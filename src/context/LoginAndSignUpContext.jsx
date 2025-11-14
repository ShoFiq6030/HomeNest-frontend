import React, { createContext, useState } from "react";

export const LoginAndSignUpContext = createContext();

export default function LoginAndSignUpContextProvider({ children }) {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  return (
    <LoginAndSignUpContext.Provider
      value={{ openLoginModal, setOpenLoginModal }}
    >
      {children}
    </LoginAndSignUpContext.Provider>
  );
}
