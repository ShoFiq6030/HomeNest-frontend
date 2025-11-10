import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import RootLayout from "../layout/RootLayout";
import HomePage from "./../pages/HomePage";
import NotFoundPage from "./../components/common/NotFoundPage";

let router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: <HomePage />,
      },

      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
