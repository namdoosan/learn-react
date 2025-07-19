import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineSecurity, MdLockOutline } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import ShoPediaLogo from "@/assets/ShoPedia.png";

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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800">
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 opacity-20 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-500 opacity-20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/4 right-[5%] w-60 h-60 bg-purple-500 opacity-20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center bg-white bg-opacity-95 backdrop-filter backdrop-blur-md border border-gray-200 shadow-2xl shadow-blue-900/50 rounded-xl w-[95%] max-w-5xl p-6 lg:p-10 transform transition-all duration-300">
        <div className="lg:w-1/2 flex items-center justify-center p-4 lg:p-8 order-2 lg:order-1">
          <img
            src={ShoPediaLogo}
            alt="ShoPedia Logo"
            className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto object-contain transform transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="lg:w-1/2 p-6 md:p-8 order-1 lg:order-2">
          <div className="flex flex-col items-center">
            <div className="bg-blue-600 text-white shadow-xl rounded-full p-4 mb-4 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <MdOutlineSecurity className="text-4xl" />
            </div>
            <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2 font-['Inter', sans-serif] drop-shadow-sm tracking-tight">
              Login to Your Account
            </h2>
            <p className="text-center text-base text-gray-600 mb-6 font-medium">
              Access your dashboard with ease.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <Input
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              required
              icon={<FaUserCircle className="text-gray-400" />}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 bg-gray-50 shadow-inner"
            />

            <Input
              label="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              icon={<MdLockOutline className="text-gray-400" />}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 bg-gray-50 shadow-inner"
            />

            <div className="flex justify-center mt-4">
              <Button
                type="submit"
                className="bg-blue-600 text-white text-center w-full py-3 rounded-lg font-bold text-lg tracking-wide shadow-lg shadow-blue-500/50 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300">Sign In
              </Button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}
