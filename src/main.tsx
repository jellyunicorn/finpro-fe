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

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/user",
    element: <UserDashboard/>
  },
  {element:<AuthLayout/>,
    children:[
      {path: "/login", element:<Login/>},
      {path: "/register", element:<Register/>},
      {path: "/verified", element:<VerifiedPage/>},
    ]

  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
