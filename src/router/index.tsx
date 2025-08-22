import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { getBasename } from "@ice/stark-app";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Settings from "../pages/Settings";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },
  ],
  {
    basename: getBasename() || "/",
  }
);

console.log("MicroAppRouter:", {
  routes: router.routes,
  basename: router.basename,
});

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
