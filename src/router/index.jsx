import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "../pages/index.jsx";
import HomePage from "../home/index.jsx";

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
