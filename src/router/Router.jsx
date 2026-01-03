import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import RootLayout from "../layout/RootLayout";
import HomePage from "./../pages/HomePage";
import About from "../pages/About";

import AllPropertiesPage from "../pages/AllPropertiesPage";
import PropertyDetailsPage from "./../pages/PropertyDetailsPage";

import MyPropertiesPage from "../pages/MyPropertiesPage";
import MyRatingsPage from "../pages/MyRatingsPage";
import NotFoundPage from "./../pages/NotFoundPage";
import PrivateRoute from "../privateRoute/PrivateRoute";
import UserProfilePage from "../pages/UserProfilePage";
import AdminDashboard from "../pages/AdminDashboard";
import UserDashboard from "../pages/UserDashboard";

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
        path: "/about",
        element: <About />,
      },
      {
        path: "/all-properties/:id",
        element: (
          <PrivateRoute>
            <PropertyDetailsPage />
          </PrivateRoute>
        ),
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
      {
        path: "/profile/:id",
        element: (
          <PrivateRoute>
            <UserProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admin/:useId",
        element: (
          <PrivateRoute roles={["admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/user/:useId",
        element: (
          <PrivateRoute roles={["user"]}>
            <UserDashboard />
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
