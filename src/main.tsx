import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import { authLoader } from "./loaders/auth.ts";
import AdminDashboard from "./pages/admin-dashboard/AdminDashboard.tsx";
import AdminDashboardSettings from "./pages/admin-dashboard/AdminDashboardSettings.tsx";
import DriverDashboard from "./pages/driver-dashboard/DriverDashboard.tsx";
import DriverDashboardSettings from "./pages/driver-dashboard/DriverDashboardSettings.tsx";
import LandingPage from "./pages/landing-page/LandingPage.tsx";
import AuthLayout from "./pages/login-register/AuthLayout.tsx";
import Login from "./pages/login-register/layout/Login.tsx";
import Register from "./pages/login-register/layout/Register.tsx";
import VerifiedPage from "./pages/login-register/layout/VerifiedPage.tsx";
import UserDashboard from "./pages/user-dashboard/UserDashboard.tsx";
import WorkerDashboard from "./pages/worker-dashboard/WorkerDashboard.tsx";
import WorkerDashboardAttendance from "./pages/worker-dashboard/WorkerDashboardAttendance.tsx";
import WorkerDashboardOrders from "./pages/worker-dashboard/WorkerDashboardOrders.tsx";
import WorkerDashboardSettings from "./pages/worker-dashboard/WorkerDashboardSettings.tsx";
import UserProfile from "./pages/user-dashboard/layout/UserProfile.tsx";
import ResetPassword from "./pages/user-dashboard/layout/ResetPassword.tsx";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/user-home",
    loader: authLoader(["USER"]),
    element: <UserDashboard />,
    children: [
      { path: "user-profile", element: <UserProfile /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },
  {
    path: "/driver-dashboard",
    element: <DriverDashboard />,
    children: [{ path: "settings", element: <DriverDashboardSettings /> }],
  },
  {
    path: "/worker-dashboard",
    element: <WorkerDashboard />,
    children: [
      { path: "attendance", element: <WorkerDashboardAttendance /> },
      { path: "orders", element: <WorkerDashboardOrders /> },
      { path: "settings", element: <WorkerDashboardSettings /> }
    ],
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
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
