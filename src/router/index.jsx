import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "../pages/auth/index.jsx";
import MainLayout from "../components/Layout/MainLayout";
import HomePage from "../pages/home/index.jsx";
import ProtectedRoute from "../services/ProtectedRoute/index.jsx"; 
import '../index.css';
import ProductPage from "../pages/management/Product.jsx";
import ProductDetailPage from "../pages/management/ProductDetailPage.jsx";
import RoleRoute from "../services/ProtectedRoute/RoleRoute.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import ManageUserPage from "../pages/home/ManageUserPage/ManageUserPage.jsx";
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/manage-product" element={<ProductPage />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/manage-product" element={<ProductPage />} />
                <Route element={<RoleRoute allowedRoles={["manager"]} />}>
                  <Route path="/manage-user" element={<ManageUserPage />} />
                </Route>
                <Route path="/management/product/:id" element={<ProductDetailPage />} />
              </Route>
            </Route>
            <Route path="/management/product/:id" element={<ProductDetailPage />} />
          </Route>
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}