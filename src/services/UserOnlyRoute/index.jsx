

import { Navigate, Outlet } from "react-router-dom";

export default function UserOnlyRoute() {
  const token = sessionStorage.getItem("authToken");
  const userRole = sessionStorage.getItem("userRole"); // Asumsi Anda menyimpan peran pengguna di sessionStorage

  // Jika tidak ada token (belum login), arahkan ke halaman login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Jika token ada, tapi peran pengguna adalah 'admin', arahkan ke NotFoundPage
  if (userRole === "admin") {
    return <Navigate to="/404" replace />; // Arahkan ke halaman 404
  }

  // Jika pengguna bukan admin dan sudah login, izinkan akses
  return <Outlet />;
}