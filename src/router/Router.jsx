import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import RootLayout from "../layout/RootLayout";
import HomePage from "./../pages/HomePage";
import NotFoundPage from "./../components/common/NotFoundPage";
import AllPropertiesPage from "../pages/AllPropertiesPage";
import PropertyDetailsPage from "./../pages/PropertyDetailsPage";
import AddPropertiesPage from "../pages/AddPropertiesPage";
import MyPropertiesPage from "../pages/MyPropertiesPage";
import MyRatingsPage from "../pages/MyRatingsPage";

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
        path: "/add-properties",
        element: <AddPropertiesPage />,
      },
      {
        path: "/my-properties",
        element: <MyPropertiesPage />,
      },
      {
        path: "/my-ratings",
        element: <MyRatingsPage />,
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
