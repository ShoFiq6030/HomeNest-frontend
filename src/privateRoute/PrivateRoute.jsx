import React, { useEffect } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

import { useLoginModal } from "./../hooks/useLoginModal";
import { toast } from "react-toastify";
import Loading from "../components/common/Loading";

export default function PrivateRoute({ children, roles }) {
  const { user, authLoading } = useAuth();
  const { setOpenLoginModal } = useLoginModal();

  if (authLoading) {
    return <Loading />;
  }

  if (!user) {
    toast.error("Unauthorized! Please Login.");
    setOpenLoginModal(true);

    return <Navigate to="/" />;
  }

  // If `roles` prop is provided, ensure user's role is allowed
  if (roles && (!user.role || !roles.includes(user.role))) {
    toast.error("Forbidden: you don't have permission to access this page.");
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
