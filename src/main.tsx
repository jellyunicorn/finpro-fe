import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import { authLoader } from "./loaders/auth.ts";
import { userAddressLoader } from "./loaders/userAddressLoader.ts";
import { userDataLoader } from "./loaders/userDataLoader.ts";

import LandingPage from "./pages/landing-page/LandingPage.tsx";
import AuthLayout from "./pages/login-register/AuthLayout.tsx";
import Login from "./pages/login-register/layout/Login.tsx";
import Register from "./pages/login-register/layout/Register.tsx";
import ResetPage from "./pages/login-register/layout/ResetPage.tsx";
import ResetPassword from "./pages/login-register/layout/ResetPassword.tsx";
import VerifiedPage from "./pages/login-register/layout/VerifiedPage.tsx";
import UserDashboard from "./pages/user-dashboard/UserDashboard.tsx";
import DriverDashboard from "./pages/driver-dashboard/DriverDashboard.tsx";
import WorkerDashboard from "./pages/worker-dashboard/WorkerDashboard.tsx";
import AdminDashboard from "./pages/admin-dashboard/AdminDashboard.tsx";
import MainDashboard from "./pages/user-dashboard/layout/MainDashboard.tsx";
import LoadingSpinner from "./components/LoadingSpinner.tsx";

const UserProfile = lazy(() => import("./pages/user-dashboard/layout/UserProfile.tsx"));
const OrderHistory = lazy(() => import("./pages/user-dashboard/layout/OrderHistory.tsx"));
const OrderDetails = lazy(() => import("./pages/user-dashboard/layout/OrderDetails.tsx"));
const CreatePickup = lazy(() => import("./pages/user-dashboard/layout/CreatePickup.tsx"));
const ReverifyEmail = lazy(() => import("./pages/user-dashboard/layout/ReverifyEmail.tsx"));
const Settings = lazy(() => import("./pages/user-dashboard/layout/Settings.tsx"));
const MyAddresses = lazy(() => import("./pages/user-dashboard/layout/MyAddresses.tsx"));

const DriverDashboardDeliveries = lazy(() => import("./pages/driver-dashboard/DriverDashboardDeliveries.tsx"));
const DriverDashboardDeliveryHistory = lazy(() => import("./pages/driver-dashboard/DriverDashboardDeliveryHistory.tsx"));
const DriverDashboardSettings = lazy(() => import("./pages/driver-dashboard/DriverDashboardSettings.tsx"));

const WorkerDashboardOrders = lazy(() => import("./pages/worker-dashboard/WorkerDashboardOrders.tsx"));
const WorkerDashboardOpenOrders = lazy(() => import("./pages/worker-dashboard/WorkerDashboardOpenOrders.tsx"));
const WorkerDashboardOrderHistory = lazy(() => import("./pages/worker-dashboard/WorkerDashboardOrderHistory.tsx"));
const WorkerDashboardSettings = lazy(() => import("./pages/worker-dashboard/WorkerDashboardSettings.tsx"));

const AdminDashboardAttendance = lazy(() => import("./pages/admin-dashboard/AdminDashboardAttendance.tsx"));
const AdminDashboardAttendanceDetail = lazy(() => import("./pages/admin-dashboard/AdminDashboardAttendanceDetail.tsx"));
const AdminDashboardSettings = lazy(() => import("./pages/admin-dashboard/AdminDashboardSettings.tsx"));

const queryClient = new QueryClient();

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
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
            path: "profile",
            element: <UserProfile />,
            loader: userDataLoader,
          },
          { path: "orders", element: <OrderHistory /> },
          { path: "orders/:orderId", element: <OrderDetails /> },
          { path: "pickup", element: <CreatePickup />, loader: userAddressLoader },
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
          { path: "my-addresses", element: <MyAddresses />, loader: userAddressLoader },
        ],
      },
      {
        path: "driver",
        element: <DriverDashboard />,
        loader: authLoader(["DRIVER"]),
        children: [
          { path: "deliveries", element: <DriverDashboardDeliveries /> },
          { path: "deliveries/history", element: <DriverDashboardDeliveryHistory /> },
          { path: "settings", element: <DriverDashboardSettings />, loader: userDataLoader },
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
          { path: "settings", element: <WorkerDashboardSettings />, loader: userDataLoader },
        ],
      },
      {
        path: "admin",
        element: <AdminDashboard />,
        loader: authLoader(["ADMIN"]),
        children: [
          { path: "attendance-log", element: <AdminDashboardAttendance /> },
          { path: "attendance-log/:id", element: <AdminDashboardAttendanceDetail /> },
          { path: "settings", element: <AdminDashboardSettings />, loader: userDataLoader },
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
          <Suspense fallback={<LoadingSpinner />}>
            <RouterProvider router={router} />
          </Suspense>
        </NuqsAdapter>
        <Toaster position="top-center" />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
