// src/pages/NotFoundPage/NotFoundPage.jsx

import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa"; // Pastikan react-icons terinstal
// import MainLayout from "@/components/Layout/MainLayout"; // Hapus import ini jika NotFoundPage akan dibungkus oleh MainLayout di router

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    // Jika NotFoundPage akan dibungkus oleh MainLayout di router,
    // maka cukup div ini saja. Jika tidak, Anda perlu membungkusnya sendiri di sini.
    // Contoh pembungkus manual (jika tidak pakai MainLayout di router):
    // <MainLayout>
    //   <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] p-6 text-center">
    //      ... konten ...
    //   </div>
    // </MainLayout>
    // Karena ini adalah NotFoundPage, idealnya dia berdiri sendiri tanpa sidebar/navbar kecuali ditentukan di router.
    // Saya akan membuat div utama dari NotFoundPage ini tetap standalone, namun dengan tema pink.
    // Jika Anda ingin sidebar/navbar muncul, Anda harus mengaturnya di konfigurasi router Anda,
    // atau Anda harus mengimpor MainLayout di sini dan membungkusnya.

    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-pink-200 p-6 text-center overflow-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-pink-200/50 p-10 max-w-lg w-full border border-pink-200 transform transition-transform duration-300 hover:scale-[1.01]">
        <FaExclamationTriangle className="text-pink-500 text-7xl mb-8 mx-auto animate-pulse" /> {/* Ikon lebih besar dan animasi */}
        <h1 className="text-5xl font-extrabold text-pink-700 mb-4 font-['Pacifico', cursive]">
          Oops! Page Not Found
        </h1>
        <p className="text-pink-600 text-lg mb-8 font-semibold">
          The page you're looking for seems to have wandered off.
          It might be busy spreading love somewhere else!
        </p>
        <button
          onClick={() => navigate("/home")}
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-8 py-3 rounded-full shadow-lg shadow-pink-300/50 transform transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
        >
          <span className="text-xl">💖</span> Back to Home Sweet Home
        </button>
      </div>
    </div>
  );
}