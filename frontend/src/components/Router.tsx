import React from "react";
import Users from "../pages/Users/Users";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Users />,
  },
]);
export default function Router() {
  return <RouterProvider router={router} />;
}
