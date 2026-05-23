import { Navigate } from "react-router";
import { useAuthStore } from "../store/auth.store";

interface Props {
  children: React.ReactNode;
}

export default function AdminProtectedRoute({ children }: Props) {
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);

  // Belum login
  if (!accessToken || !user) {
    return <Navigate to="/login" replace />;
  }

  // Bukan admin
  if (user.role !== "SUPER_ADMIN" && user.role !== "OUTLET_ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
