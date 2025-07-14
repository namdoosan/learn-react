import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "../pages/index.jsx";


export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}
