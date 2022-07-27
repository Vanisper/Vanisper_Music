import { lazy } from "react";
import { BrowserRouter, RouteObject, useRoutes } from "react-router-dom";

import LayOut from "~/layout/index";
import Loading from "~/pages/loading/index";

const Hello = lazy(() => import("~/pages/Hello/index")); // 欢迎

export const Router = () => {
  /**
   * 重定向到/app
   */
  if (window.location.pathname === "/") {
    window.location.pathname = "/app";
  }
  return (
    <BrowserRouter basename="/app">
      <InnerRouter />
    </BrowserRouter>
  );
};
const InnerRouter = () => {
  // 路由信息
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <LayOut />,
    },
    {
      path: "/hello",
      element: <Hello />,
    },
    {
      path: "*",
      element: <Loading />,
    },
  ];
  const element = useRoutes(routes);

  return element;
};
