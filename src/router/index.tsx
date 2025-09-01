import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { getBasename } from "@ice/stark-app";
import MainLayout from "../layouts/MainLayout";
import HelloWorld from "../pages/HelloWorld";
import ChartFetch from "../pages/ChartFetch";
import TableDisplay from "../pages/TableDisplay";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HelloWorld />,
        },
        {
          path: "hello-world",
          element: <HelloWorld />,
        },
        {
          path: "chart-fetch",
          element: <ChartFetch />,
        },
        {
          path: "table-display",
          element: <TableDisplay />,
        },
      ],
    },
  ],
  {
    // 可选：通过getBasename()获取到微应用运行时的basename并传入
    basename: getBasename() || "/",
  },
);

console.log("MicroAppRouter:", {
  routes: router.routes,
  basename: router.basename,
});

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
