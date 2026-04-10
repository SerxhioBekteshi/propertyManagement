import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { dashboardRoutes } from "./dashboard";
import Page404 from "../pages/404";

const LoginPage = lazy(() => import("../pages/login/LoginPage"));

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <LoginPage />,
    },
    ...dashboardRoutes,
    { path: "*", element: <Navigate to="/404" replace /> },
    { path: "404", element: <Page404 /> },
  ]);
};
export default Router;
