import { useLocation } from "react-router-dom";
// import { FiUser } from "react-icons/fi"; // FiUser tidak digunakan secara eksplisit di sini, tapi bisa disimpan untuk masa depan
import { IoMenu } from "react-icons/io5"; // Untuk ikon menu toggle

export default function Navbar({ username, toggleSidebar, isSidebarOpen }) {
  const location = useLocation();

  const currentPath = location.pathname.split("/")[1] || "home";
  // Menyesuaikan judul halaman agar lebih "cute"
  const pageTitle = currentPath.toLowerCase() === 'home' ? 'My Sweet Home' :
                    currentPath.toLowerCase() === 'manage-product' ? 'Product Love-List' :
                    currentPath.toLowerCase() === 'manage' ? 'Heartfelt Users' : // Untuk /manage/user
                    currentPath.toLowerCase() === 'setting' ? 'My Cozy Settings' :
                    currentPath.toUpperCase().replace("-", " "); // Fallback

  return (
    <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0" // Sesuaikan ml-64 karena sidebar 64px
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 bg-pink-200/80 backdrop-blur-md rounded-b-3xl shadow-lg shadow-pink-300/40 border-b border-pink-300">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="text-pink-800 hover:text-pink-600 transition-colors"
            >
              <IoMenu size={28} /> {/* Ikon menu yang lebih cantik */}
            </button>
            <h1 className="text-xl font-bold text-pink-900 font-['Pacifico', cursive] drop-shadow-sm">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-pink-800 font-semibold flex items-center gap-1">
                <span className="text-xl">💖</span> {username}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}