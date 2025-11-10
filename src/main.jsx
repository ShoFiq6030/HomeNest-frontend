import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import { RouterProvider } from "react-router";
import router from "./router/Router";
import AuthProvider from "./provider/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      {/* <h1>hello</h1> */}
    </AuthProvider>
  </StrictMode>
);
