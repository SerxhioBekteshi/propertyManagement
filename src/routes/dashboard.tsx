import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import BaseLayout from "../components/ui/baseLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import SplashScreen from "../components/splash-screen";

const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage"));
const PropertyDetailsPage = lazy(() => import("../pages/propertyDetails"));

export const dashboardRoutes = [
  {
    path: "/",
    element: (
      <BaseLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </BaseLayout>
    ),
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "property/:id/details",
        element: (
          <ProtectedRoute>
            <PropertyDetailsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
];
