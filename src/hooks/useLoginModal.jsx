import { useContext } from "react";

import { LoginAndSignUpContext } from "../context/LoginAndSignUpContext";

export const useLoginModal = () => useContext(LoginAndSignUpContext);
