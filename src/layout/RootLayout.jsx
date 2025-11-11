
import { Outlet } from "react-router";
import React from "react";



import { ToastContainer } from "react-toastify";
import Navbar from "../components/common/Navbar";
import Footer from "./../components/common/Footer";

export default function RootLayout() {
  return (
    <div className="flex flex-col  bg-gray-100">
      <div className="sticky top-0 z-50  bg-base-100">
        <Navbar />
      </div>
      <div className="min-h-screen  mx-auto">
        <Outlet />
        <ToastContainer />
      </div>

      <Footer />
    </div>
  );
}
