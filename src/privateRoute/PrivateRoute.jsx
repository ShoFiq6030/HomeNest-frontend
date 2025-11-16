import React, { useEffect } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

import { useLoginModal } from "./../hooks/useLoginModal";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  const { setOpenLoginModal } = useLoginModal();

  if (!user) {
    setOpenLoginModal(true);
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
