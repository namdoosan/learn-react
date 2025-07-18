import { Navigate, Outlet } from "react-router-dom";

export default function RoleRoute({ allowedRoles }) {
  const role = sessionStorage.getItem("role");

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/not-found" replace />;
  }

  return <Outlet />;
}
