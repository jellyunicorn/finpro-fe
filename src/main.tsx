import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";
import LandingPage from "./pages/landing-page/LandingPage.tsx";
import UserDashboard from "./pages/user-dashboard/UserDashboard.tsx";
import Login from "./pages/login-register/layout/Login.tsx";
import Register from "./pages/login-register/layout/Register.tsx";
import AuthLayout from "./pages/login-register/AuthLayout.tsx";
import VerifiedPage from "./pages/login-register/layout/VerifiedPage.tsx";
import { authLoader } from "./loaders/auth.ts";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ResetPassword from "./pages/user-dashboard/layout/ResetPassword.tsx";
import UserProfile from "./pages/user-dashboard/layout/UserProfile.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/user",
    loader: authLoader(["USER"]),
    element: <UserDashboard />,
    children: [
      { path: "resetpassword", element: <ResetPassword /> },
      { path: "profile", element: <UserProfile /> },
    ],
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
