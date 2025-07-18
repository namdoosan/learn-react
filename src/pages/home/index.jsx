import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
// import MainLayout from "@/components/Layout/MainLayout"; // Ini diasumsikan HomePage dirender di dalam Outlet MainLayout

export default function HomePage() {
  const [username, setUsername] = useState("");
  const location = useLocation();

  // Data dummy untuk dashboard
  const dashboardData = {
    totalSales: 5, // Misal: 5 biji
    totalIncomingItems: 10, // Misal: 10 barang
    // Bisa tambahkan data dummy lain jika mau
    // totalCustomers: 120,
    // pendingOrders: 3,
  };

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    } else {
      // Fallback jika username tidak ada di state, coba dari session storage
      const storedUser = sessionStorage.getItem("username");
      if (storedUser) {
        setUsername(storedUser);
      }
    }
  }, [location.state]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] p-6">
      {/* Kartu Selamat Datang */}
      <div className="bg-pink-100/70 backdrop-blur-md rounded-3xl shadow-xl shadow-pink-200/50 p-8 text-center max-w-2xl w-full border border-pink-200 mb-8 transform transition-transform duration-300 hover:scale-[1.01]">
        <h1 className="text-4xl font-extrabold text-pink-700 mb-4 font-['Pacifico', cursive] drop-shadow-md">
          Welcome, Sweet {username || "Guest"}!
        </h1>
        <p className="text-lg text-pink-600 mb-6 font-semibold">
          It's a lovely day to manage your Lovepedia.
        </p>
        <div className="text-6xl mb-4 animate-bounce-slow">💖✨🏠</div>
        <p className="text-pink-500 italic">
          "Every task is a little act of love."
        </p>
      </div>

      {/* Bagian Dashboard Data */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kartu Total Penjualan */}
        <div className="bg-pink-300/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-pink-400/50 p-6 flex flex-col items-center justify-center border border-pink-400 transform transition-transform duration-300 hover:scale-[1.02]">
          <h2 className="text-2xl font-bold text-white mb-3 font-['Pacifico', cursive]">Total Penjualan</h2>
          <p className="text-5xl font-extrabold text-white animate-pulse">
            {dashboardData.totalSales} <span className="text-xl font-normal">biji</span>
          </p>
          <p className="text-white/80 mt-2">✨ So lovely! ✨</p>
        </div>

        {/* Kartu Total Barang Masuk */}
        <div className="bg-purple-300/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-400/50 p-6 flex flex-col items-center justify-center border border-purple-400 transform transition-transform duration-300 hover:scale-[1.02]">
          <h2 className="text-2xl font-bold text-white mb-3 font-['Pacifico', cursive]">Total Barang Masuk</h2>
          <p className="text-5xl font-extrabold text-white animate-pulse">
            {dashboardData.totalIncomingItems} <span className="text-xl font-normal">barang</span>
          </p>
          <p className="text-white/80 mt-2">📦 Fresh from the heart! 📦</p>
        </div>

        {/* Anda bisa menambahkan kartu dashboard lain di sini */}
        {/*
        <div className="bg-green-300/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-green-400/50 p-6 flex flex-col items-center justify-center border border-green-400 transform transition-transform duration-300 hover:scale-[1.02]">
          <h2 className="text-2xl font-bold text-white mb-3 font-['Pacifico', cursive]">Pelanggan Setia</h2>
          <p className="text-5xl font-extrabold text-white">
            {dashboardData.totalCustomers} <span className="text-xl font-normal">hati</span>
          </p>
          <p className="text-white/80 mt-2">💕 Spreading love!</p>
        </div>
        */}
      </div>
    </div>
  );
}