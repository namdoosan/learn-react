import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { IoClose } from "react-icons/io5"; // Sidebar close icon
import ConfirmModal from "@/components/Modal/ConfirmModal";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // ✅ Tambah state loading
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("username");
    const storedRole = sessionStorage.getItem("role");

    if (!storedUser || !storedRole) {
      navigate("/");
    } else {
      setUsername(storedUser);
      setRole(storedRole);
    }

    setIsLoading(false); // ✅ tandai loading selesai
  }, [navigate]);

  const handleClickLogout = () => {
    setShowConfirmLogout(true);
  };

  const handleConfirmLogout = () => {
    setShowConfirmLogout(false);
    sessionStorage.clear();
    navigate("/");
  };

  const menuItems = [
    { name: "Home", path: "/home" },
    { name: "Manage Product", path: "/manage-product" },
    { name: "Manage User", path: "/manage-user", hiddenFor: "admin" },
    // { name: "Setting", path: "/setting" },
  ];

  // ✅ Tambah return null saat loading agar menu tidak sempat muncul
  if (isLoading) return null;

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-30 h-full bg-pink-100 text-pink-900 border-r border-pink-300 shadow-lg shadow-pink-200/50 transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-0 overflow-hidden"}`}
      >
        {/* Header Sidebar */}
        <div className="flex items-center justify-between p-4 border-b border-pink-300 bg-pink-200">
          <h1 className="text-xl font-bold text-pink-800 font-['Pacifico', cursive]">Love</h1>
          <button onClick={toggleSidebar} className="text-pink-800 lg:hidden">
            <IoClose size={24} />
          </button>
        </div>

        {/* Menu utama */}
        <ul className="p-4 space-y-3">
          {menuItems.map((item) => {
            if (item.hiddenFor && item.hiddenFor.toLowerCase() === role.toLowerCase()) {
              return null;
            }
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full text-left px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2
                    ${
                      isActive
                        ? "bg-pink-500 text-white shadow-md shadow-pink-300/50"
                        : "hover:bg-pink-200 text-pink-700"
                    }`}
                >
                  {item.name === "Home" && <span className="text-xl">🏠</span>}
                  {item.name === "Manage Product" && <span className="text-xl">📦</span>}
                  {item.name === "Manage User" && <span className="text-xl">👥</span>}
                  {item.name === "Setting" && <span className="text-xl">⚙️</span>}
                  {item.name}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Menu user */}
        {username && (
          <div className="absolute bottom-0 w-full p-4 border-t border-pink-300 bg-pink-200">
            <button
              onClick={() => setShowUserMenu((prev) => !prev)}
              className="flex justify-between items-center w-full font-medium text-pink-800 hover:text-pink-600 transition-colors"
            >
              <span className="flex items-center gap-2">
                <span className="text-xl">👤</span> {username}
              </span>
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  showUserMenu ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {showUserMenu && (
              <div className="mt-2 text-sm space-y-2">
                <button
                  onClick={handleClickLogout}
                  className="flex items-center gap-2 text-red-500 hover:text-red-700 font-semibold"
                >
                  <FiLogOut />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal Konfirmasi Logout */}
      {showConfirmLogout && (
        <ConfirmModal
          isOpen={showConfirmLogout}
          title="Are you sure you want to logout from Lovepedia?"
          onCancel={() => setShowConfirmLogout(false)}
          onConfirm={handleConfirmLogout}
        />
      )}
    </>
  );
}
