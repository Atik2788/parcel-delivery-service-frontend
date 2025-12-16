import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "@/app/store";
import type { JSX } from "react";

const RoleRoute = ({ children, allowedRoles }: { children: JSX.Element; allowedRoles: string[] }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default RoleRoute;
