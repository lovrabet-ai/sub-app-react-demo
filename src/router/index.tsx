import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getBasename } from "@ice/stark-app";
import MainLayout from "../layouts/MainLayout";
import routes from "~react-pages";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: routes,
    },
  ],
  {
    // 可选：通过getBasename()获取到微应用运行时的basename并传入
    basename: getBasename() || "/",
  },
);

// console.log("MicroAppRouter:", {
//   routes: router.routes,
//   basename: router.basename,
// });

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
