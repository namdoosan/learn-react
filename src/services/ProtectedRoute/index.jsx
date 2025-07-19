
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = sessionStorage.getItem("authToken");
  return token ? <Outlet /> : <Navigate to="/" replace />;
}