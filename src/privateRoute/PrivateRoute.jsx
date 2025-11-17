import React, { useEffect } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

import { useLoginModal } from "./../hooks/useLoginModal";
import { toast } from "react-toastify";
import Loading from "../components/common/Loading";

export default function PrivateRoute({ children }) {
  const { user,authLoading } = useAuth();
  const { setOpenLoginModal } = useLoginModal();

  if(authLoading){
    return <Loading/>
  }

  if (!user) {
    setOpenLoginModal(true);
    toast.error("Unauthorized! Please Login.")
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
