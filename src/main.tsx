import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import LandingPage from "./pages/landing-page/LandingPage.tsx";
import UserDashboard from "./pages/user-dashboard/UserDashboard.tsx";
import Login from "./pages/login-register/layout/Login.tsx";
import Register from "./pages/login-register/layout/Register.tsx";
import AuthLayout from "./pages/login-register/AuthLayout.tsx";
import VerifiedPage from "./pages/login-register/layout/VerifiedPage.tsx";
import { Toaster } from "react-hot-toast";
import UserDashboardSettings from "./pages/user-dashboard/UserDashboardSettings.tsx";
import DriverDashboard from "./pages/driver-dashboard/DriverDashboard.tsx";
import DriverDashboardSettings from "./pages/driver-dashboard/DriverDashboardSettings.tsx";
import WorkerDashboard from "./pages/worker-dashboard/WorkerDashboard.tsx";
import WorkerDashboardSettings from "./pages/worker-dashboard/WorkerDashboardSettings.tsx";
import AdminDashboard from "./pages/admin-dashboard/AdminDashboard.tsx";
import AdminDashboardSettings from "./pages/admin-dashboard/AdminDashboardSettings.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/user-dashboard",
    element: <UserDashboard />,
    children: [{ path: "settings", element: <UserDashboardSettings /> }],
  },
  {
    path: "/driver-dashboard",
    element: <DriverDashboard />,
    children: [{ path: "settings", element: <DriverDashboardSettings /> }],
  },
  {
    path: "/worker-dashboard",
    element: <WorkerDashboard />,
    children: [{ path: "settings", element: <WorkerDashboardSettings /> }],
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />,
    children: [{ path: "settings", element: <AdminDashboardSettings /> }],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/verified", element: <VerifiedPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-center" />
  </StrictMode>,
);
