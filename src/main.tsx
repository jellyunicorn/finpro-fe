import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import { authLoader } from "./loaders/auth.ts";
import { userAddressLoader } from "./loaders/userAddressLoader.ts";
import { userDataLoader } from "./loaders/userDataLoader.ts";
import AdminDashboard from "./pages/admin-dashboard/AdminDashboard.tsx";
import AdminDashboardAttendance from "./pages/admin-dashboard/AdminDashboardAttendance.tsx";
import AdminDashboardSettings from "./pages/admin-dashboard/AdminDashboardSettings.tsx";
import DriverDashboard from "./pages/driver-dashboard/DriverDashboard.tsx";
import DriverDashboardDeliveries from "./pages/driver-dashboard/DriverDashboardDeliveries.tsx";
import DriverDashboardDeliveryHistory from "./pages/driver-dashboard/DriverDashboardDeliveryHistory.tsx";
import DriverDashboardSettings from "./pages/driver-dashboard/DriverDashboardSettings.tsx";
import LandingPage from "./pages/landing-page/LandingPage.tsx";
import AuthLayout from "./pages/login-register/AuthLayout.tsx";
import Login from "./pages/login-register/layout/Login.tsx";
import Register from "./pages/login-register/layout/Register.tsx";
import ResetPage from "./pages/login-register/layout/ResetPage.tsx";
import ResetPassword from "./pages/login-register/layout/ResetPassword.tsx";
import VerifiedPage from "./pages/login-register/layout/VerifiedPage.tsx";
import CreatePickup from "./pages/user-dashboard/layout/CreatePickup.tsx";
import MainDashboard from "./pages/user-dashboard/layout/MainDashboard.tsx";
import MyAddresses from "./pages/user-dashboard/layout/MyAddresses.tsx";
import OrderDetails from "./pages/user-dashboard/layout/OrderDetails.tsx";
import OrderHistory from "./pages/user-dashboard/layout/OrderHistory.tsx";
import ReverifyEmail from "./pages/user-dashboard/layout/ReverifyEmail.tsx";
import Settings from "./pages/user-dashboard/layout/Settings.tsx";
import UserProfile from "./pages/user-dashboard/layout/UserProfile.tsx";
import UserDashboard from "./pages/user-dashboard/UserDashboard.tsx";
import WorkerDashboard from "./pages/worker-dashboard/WorkerDashboard.tsx";
import WorkerDashboardOpenOrders from "./pages/worker-dashboard/WorkerDashboardOpenOrders.tsx";
import WorkerDashboardOrderHistory from "./pages/worker-dashboard/WorkerDashboardOrderHistory.tsx";
import WorkerDashboardOrders from "./pages/worker-dashboard/WorkerDashboardOrders.tsx";
import WorkerDashboardSettings from "./pages/worker-dashboard/WorkerDashboardSettings.tsx";
import AdminDashboardAttendanceDetail from "./pages/admin-dashboard/AdminDashboardAttendanceDetail.tsx";
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
    loader: authLoader(["USER", "ADMIN", "WORKER", "DRIVER"]),
    children: [
      {
        path: "user",
        element: <UserDashboard />,
        loader: authLoader(["USER"]),
        children: [
          {
            path: "user-profile",
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
        loader: authLoader(["DRIVER"]),
        children: [
          { path: "deliveries", element: <DriverDashboardDeliveries /> },
          {
            path: "deliveries/history",
            element: <DriverDashboardDeliveryHistory />,
          },
          {
            path: "settings",
            element: <DriverDashboardSettings />,
            loader: userDataLoader,
          },
        ],
      },
      {
        path: "worker",
        element: <WorkerDashboard />,
        loader: authLoader(["WORKER"]),
        children: [
          { path: "orders", element: <WorkerDashboardOrders /> },
          { path: "orders/open", element: <WorkerDashboardOpenOrders /> },
          { path: "orders/history", element: <WorkerDashboardOrderHistory /> },
          {
            path: "settings",
            element: <WorkerDashboardSettings />,
            loader: userDataLoader,
          },
        ],
      },
      {
        path: "admin",
        element: <AdminDashboard />,
        loader: authLoader(["ADMIN"]),
        children: [
          { path: "attendance-log", element: <AdminDashboardAttendance /> },
          {
            path: "attendance-log/:id",
            element: <AdminDashboardAttendanceDetail />,
          },
          {
            path: "settings",
            element: <AdminDashboardSettings />,
            loader: userDataLoader,
          },
        ],
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
