import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Ganti FiMail dengan ikon hati dari react-icons atau simbol Unicode
import { FiHeart } from "react-icons/fi"; // Pastikan react-icons terinstal dan FiHeart tersedia
// Jika FiHeart tidak ada atau ingin hati yang lebih "penuh", Anda bisa gunakan:
// import { IoHeart } from "react-icons/io5";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
// import cloudBg from "@/assets/cloud.jpg"; // Tidak digunakan lagi

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    let role = "";
    if (username === "Icet" && password === "kyuti") {
      role = "manager";
    } else if (username === "Manager" && password === "manager123") {
      role = "manager";
    } else if (username === "Admin" && password === "admin123") {
      role = "admin";
    } else {
      alert("Username atau password salah!");
      return;
    }

    sessionStorage.setItem("authToken", "logged-in");
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("username", username);
    navigate("/home", { state: { username } });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      // Latar belakang gradien pink-ungu
      style={{
        backgroundImage: 'linear-gradient(to bottom right, #FFC0CB, #FF69B4, #9370DB)', // Pink, Hot Pink, MediumPurple
        // Alternatif gradien dengan warna Tailwind:
        // backgroundImage: 'linear-gradient(to bottom right, theme(colors.pink.200), theme(colors.pink.400), theme(colors.purple.300))',
      }}
    >
      {/* Efek glitter atau sparkle background (opsional) */}
      <div className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='1' fill='%23FFFFFF' opacity='0.7'/%3E%3C/svg%3E")`,
          backgroundSize: '10px 10px',
        }}
      ></div>

      {/* Bentuk hati dan sparkle yang bergerak sebagai dekorasi */}
      <div className="absolute top-[10%] left-[10%] text-pink-300 text-6xl animate-pulse delay-75">💖</div>
      <div className="absolute bottom-[20%] right-[15%] text-purple-200 text-5xl animate-float delay-100">✨</div>
      <div className="absolute top-[30%] right-[5%] text-pink-400 text-4xl animate-sparkle delay-200">❤️</div>
      <div className="absolute bottom-[5%] left-[5%] text-purple-300 text-7xl animate-pulse delay-300">💜</div>
      <div className="absolute top-[50%] left-[25%] text-pink-200 text-5xl animate-float delay-150">🌟</div>

      <div className="relative z-10 backdrop-blur-lg bg-pink-50/80 border border-pink-200 shadow-2xl shadow-pink-300/60 rounded-3xl w-[90%] max-w-sm p-8 transform transition-all duration-300 hover:scale-[1.02]">
        <div className="flex flex-col items-center">
          <div className="bg-pink-400 shadow-lg rounded-full p-4 mb-4 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
            {/* Mengganti ikon */}
            <FiHeart className="text-3xl text-white drop-shadow-md" />
            {/* Alternatif jika FiHeart tidak tersedia, atau ingin hati Unicode */}
            {/* <span className="text-3xl text-white">❤️</span> */}
          </div>
          <h2 className="text-3xl font-extrabold text-center text-pink-700 mb-2 font-['Pacifico', cursive] drop-shadow-sm">Welcome To Lovepedia</h2>
          <p className="text-center text-base text-pink-600 mb-6 font-semibold">Please, Sign In First with Love!</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <Input
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            required
            className="w-full px-4 py-2 border-2 border-pink-300 rounded-lg text-pink-800 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition-all duration-200 bg-pink-100/60 shadow-inner"
          />

          <Input
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className="w-full px-4 py-2 border-2 border-pink-300 rounded-lg text-pink-800 placeholder-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition-all duration-200 bg-pink-100/60 shadow-inner"
          />

          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              // Menggunakan warna pink dari palet baru
              className="bg-pink-500 text-white text-center w-full py-3 rounded-full font-bold text-lg tracking-wide shadow-lg shadow-pink-400/50 hover:bg-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-300"
            >
              ❤️ Login ❤️
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}