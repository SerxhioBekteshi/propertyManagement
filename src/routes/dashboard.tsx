import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import BaseLayout from "../components/ui/baseLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import SplashScreen from "../components/splash-screen";

const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage"));
const PropertyDetailsPage = lazy(() => import("../pages/propertyDetails"));
const ZonesPage = lazy(() => import("../pages/zones/ZonesPage"));
const CitiesPage = lazy(() => import("../pages/cities/CitiesPage"));
const DivisionsPage = lazy(() => import("../pages/divisions/DivisionsPage"));
const CountriesPage = lazy(() => import("../pages/countries/CountriesPage"));
const ContactsPage = lazy(() => import("../pages/contacts/ContactsPage"));
const StreetsPage = lazy(() => import("../pages/streets/StreetsPage"));

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
        path: "zones",
        element: (
          <ProtectedRoute>
            <ZonesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "cities",
        element: (
          <ProtectedRoute>
            <CitiesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "divisions",
        element: (
          <ProtectedRoute>
            <DivisionsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "countries",
        element: (
          <ProtectedRoute>
            <CountriesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "streets",
        element: (
          <ProtectedRoute>
            <StreetsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "contacts",
        element: (
          <ProtectedRoute>
            <ContactsPage />
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
