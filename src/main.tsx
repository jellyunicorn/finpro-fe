import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import LandingPage from "./pages/landing-page/LandingPage.tsx";
import UserDashboard from "./pages/user-dashboard/UserDashboard.tsx";
import Login from "./pages/login/Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/user",
    element: <UserDashboard/>
  },
    {
    path: "/login",
    element: <Login/>
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
