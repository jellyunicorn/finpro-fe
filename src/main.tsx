import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import { authLoader } from "./loaders/auth.ts";
import { userDataLoader } from "./loaders/userDataLoader.ts";
import AdminDashboard from "./pages/admin-dashboard/AdminDashboard.tsx";
import AdminDashboardSettings from "./pages/admin-dashboard/AdminDashboardSettings.tsx";
import DriverDashboard from "./pages/driver-dashboard/DriverDashboard.tsx";
import DriverDashboardSettings from "./pages/driver-dashboard/DriverDashboardSettings.tsx";
import LandingPage from "./pages/landing-page/LandingPage.tsx";
import AuthLayout from "./pages/login-register/AuthLayout.tsx";
import Login from "./pages/login-register/layout/Login.tsx";
import Register from "./pages/login-register/layout/Register.tsx";
import VerifiedPage from "./pages/login-register/layout/VerifiedPage.tsx";
import ResetPassword from "./pages/login-register/layout/ResetPassword.tsx";
import UserProfile from "./pages/user-dashboard/layout/UserProfile.tsx";
import UserDashboard from "./pages/user-dashboard/UserDashboard.tsx";
import WorkerDashboard from "./pages/worker-dashboard/WorkerDashboard.tsx";
import WorkerDashboardAttendance from "./pages/worker-dashboard/WorkerDashboardAttendance.tsx";
import WorkerDashboardOrders from "./pages/worker-dashboard/WorkerDashboardOrders.tsx";
import WorkerDashboardSettings from "./pages/worker-dashboard/WorkerDashboardSettings.tsx";
import Settings from "./pages/user-dashboard/layout/Settings.tsx";
import WorkerDashboardChangePassword from "./pages/worker-dashboard/WorkerDashboardChangePassword.tsx";
import WorkerDashboardOrderHistory from "./pages/worker-dashboard/WorkerDashboardOrderHistory.tsx";
import DriverDashboardAttendance from "./pages/driver-dashboard/DriverDashboardAttendance.tsx";
import DriverDashboardChangePassword from "./pages/driver-dashboard/DriverDashboardChangePassword.tsx";
import DriverDashboardDeliveries from "./pages/driver-dashboard/DriverDashboardDeliveries.tsx";
import DriverDashboardDeliveryHistory from "./pages/driver-dashboard/DriverDashboardDeliveryHistory.tsx";
import ReverifyEmail from "./pages/user-dashboard/layout/ReverifyEmail.tsx";
import MyAddresses from "./pages/user-dashboard/layout/MyAddresses.tsx";
import { userAddressLoader } from "./loaders/userAddressLoader.ts";
import MainDashboard from "./pages/user-dashboard/layout/MainDashboard.tsx";
import OrderHistory from "./pages/user-dashboard/layout/OrderHistory.tsx";
import CreatePickup from "./pages/user-dashboard/layout/CreatePickup.tsx";
import OrderDetails from "./pages/user-dashboard/layout/OrderDetails.tsx";
import ResetPage from "./pages/login-register/layout/ResetPage.tsx";
import WorkerDashboardOpenOrders from "./pages/worker-dashboard/WorkerDashboardOpenOrders.tsx";
const queryClient = new QueryClient();

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/verified", element: <VerifiedPage /> },
      { path: "/resetpass", element: <ResetPage /> },
      { path: "/reset", element: <ResetPassword /> },
    ],
  },
  {
    path: "/dashboard",
    children: [
      {
        path: "user",
        loader: authLoader(["USER"]),
        element: <UserDashboard />,
        children: [
          {
            path: "profile",
            element: <UserProfile />,
            loader: userDataLoader,
          },
          { path: "orders", element: <OrderHistory /> },
          { path: "orders/:orderId", element: <OrderDetails /> },
          {
            path: "pickup",
            element: <CreatePickup />,
            loader: userAddressLoader,
          },
          { path: "verify-mail", element: <ReverifyEmail /> },
          { path: "settings", element: <Settings />, loader: userDataLoader },
          {
            path: "",
            element: <MainDashboard />,
            loader: async () => {
              const [userdata, addresses] = await Promise.all([
                userDataLoader(),
                userAddressLoader(),
              ]);
              return { userdata, addresses };
            },
          },
          {
            path: "my-addresses",
            element: <MyAddresses />,
            loader: userAddressLoader,
          },
        ],
      },
      {
        path: "driver",
        element: <DriverDashboard />,
        children: [
          { path: "attendance", element: <DriverDashboardAttendance /> },
          { path: "deliveries", element: <DriverDashboardDeliveries /> },
          {
            path: "deliveries/history",
            element: <DriverDashboardDeliveryHistory />,
          },
          { path: "settings", element: <DriverDashboardSettings /> },
          {
            path: "settings/change-password",
            element: <DriverDashboardChangePassword />,
          },
        ],
      },
      {
        path: "worker",
        element: <WorkerDashboard />,
        children: [
          { path: "attendance", element: <WorkerDashboardAttendance /> },
          { path: "orders", element: <WorkerDashboardOrders /> },
          { path: "orders/open", element: <WorkerDashboardOpenOrders /> },
          { path: "orders/history", element: <WorkerDashboardOrderHistory /> },
          { path: "settings", element: <WorkerDashboardSettings /> },
          {
            path: "settings/change-password",
            element: <WorkerDashboardChangePassword />,
          },
        ],
      },
      {
        path: "admin",
        element: <AdminDashboard />,
        children: [{ path: "settings", element: <AdminDashboardSettings /> }],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <RouterProvider router={router} />
        </NuqsAdapter>
        <Toaster position="top-center" />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
