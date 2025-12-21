import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "@/app/store";
import type { JSX } from "react";
import type { UserRole } from "@/features/auth/authSlice";

interface RoleRouteProps {
  children: JSX.Element;
  allowedRoles: UserRole[];
}

const RoleRoute = ({ children, allowedRoles }: RoleRouteProps) => {
  const { user, accessToken } = useSelector((state: RootState) => state.auth);

  // 🔐 not logged in
  if (!accessToken || !user) {
    return <Navigate to="/login" replace />;
  }

  // ⛔ role not allowed
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleRoute;
