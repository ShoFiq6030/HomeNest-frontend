import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import RootLayout from "../layout/RootLayout";
import HomePage from "./../pages/HomePage";

import AllPropertiesPage from "../pages/AllPropertiesPage";
import PropertyDetailsPage from "./../pages/PropertyDetailsPage";

import MyPropertiesPage from "../pages/MyPropertiesPage";
import MyRatingsPage from "../pages/MyRatingsPage";
import NotFoundPage from "./../pages/NotFoundPage";
import PrivateRoute from "../privateRoute/PrivateRoute";

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
        path: "/all-properties",
        element: <AllPropertiesPage />,
      },
      {
        path: "/all-properties/:id",
        element: <PropertyDetailsPage />,
      },

      {
        path: "/my-properties",
        element: (
          <PrivateRoute>
            <MyPropertiesPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-ratings",
        element: (
          <PrivateRoute>
            <MyRatingsPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
