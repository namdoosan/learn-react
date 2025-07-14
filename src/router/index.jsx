import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "../pages/auth/index.jsx";
import HomePage from "../pages/home/index.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
