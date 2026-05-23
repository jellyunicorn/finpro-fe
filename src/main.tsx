import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Toaster as HotToaster } from "react-hot-toast";
import { Toaster as SonnerToaster } from "sonner";
import "./index.css";

import LandingPage from "./pages/landing-page/LandingPage.tsx";
import UserDashboard from "./pages/user-dashboard/UserDashboard.tsx";
import Login from "./pages/login-register/layout/Login.tsx";
import Register from "./pages/login-register/layout/Register.tsx";
import AuthLayout from "./pages/login-register/AuthLayout.tsx";
import VerifiedPage from "./pages/login-register/layout/VerifiedPage.tsx";

import AdminLayout from "./components/admin/layout/AdminLayout.tsx";
import AdminProtectedRoute from "./routes/AdminProtectedRoute.tsx";
import DashboardHome from "./pages/admin/dashboard/DashboardHome.tsx";
import OrderList from "./pages/admin/orders/OrderList.tsx";
import OrderDetail from "./pages/admin/orders/OrderDetail.tsx";
import ProcessOrder from "./pages/admin/orders/ProcessOrder.tsx";
import OutletList from "./pages/admin/outlets/OutletList.tsx";
import OutletCreate from "./pages/admin/outlets/OutletCreate.tsx";
import OutletEdit from "./pages/admin/outlets/OutletEdit.tsx";
import UserList from "./pages/admin/users/UserList.tsx";
import LaundryItemList from "./pages/admin/laundry-items/LaundryItemList.tsx";
import BypassRequestList from "./pages/admin/bypass-requests/BypassRequestList.tsx";
import SalesReport from "./pages/admin/reports/SalesReport.tsx";
import PerformanceReport from "./pages/admin/reports/PerformanceReport.tsx";
import AdminProfile from "./pages/admin/profile/AdminProfile.tsx";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/user", element: <UserDashboard /> },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/verified", element: <VerifiedPage /> },
    ],
  },

  {
    path: "/admin",
    element: (
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "dashboard", element: <DashboardHome /> },

      // Orders
      { path: "orders", element: <OrderList /> },
      { path: "orders/:id", element: <OrderDetail /> },
      { path: "orders/:id/process", element: <ProcessOrder /> },

      // Outlets
      { path: "outlets", element: <OutletList /> },
      { path: "outlets/create", element: <OutletCreate /> },
      { path: "outlets/:id/edit", element: <OutletEdit /> },

      // Users
      { path: "users", element: <UserList /> },

      // Laundry Items
      { path: "laundry-items", element: <LaundryItemList /> },

      // Bypass Requests
      { path: "bypass-requests", element: <BypassRequestList /> },

      // Reports
      { path: "reports/sales", element: <SalesReport /> },
      { path: "reports/performance", element: <PerformanceReport /> },

      // Profile
      { path: "profile", element: <AdminProfile /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <HotToaster position="top-center" />
    <SonnerToaster richColors position="top-right" />
  </StrictMode>,
);