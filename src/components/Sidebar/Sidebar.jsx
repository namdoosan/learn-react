import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard, MdProductionQuantityLimits, MdPeople } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import ConfirmModal from "@/components/Modal/ConfirmModal";

export default function Sidebar({ isOpen }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

    setIsLoading(false);
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
    { name: "Dashboard", path: "/home", icon: <MdDashboard /> },
    { name: "Manage Product", path: "/manage-product", icon: <MdProductionQuantityLimits /> },
    { name: "Manage User", path: "/manage-user", hiddenFor: "admin", icon: <MdPeople /> },
  ];

  if (isLoading) return null;

  return (
    <>
      <div className={`fixed top-0 left-0 z-30 h-full bg-blue-900 text-gray-100 border-r border-blue-800 shadow-xl shadow-blue-950/50 transition-all duration-300 ease-in-out font-sans ${isOpen ? "w-64" : "w-0 overflow-hidden"}`}>
        <div className="flex items-center justify-between p-5 border-b border-blue-800 bg-blue-800">
          <h1 className="text-2xl font-bold text-white tracking-wide"><span className="text-orange-400">Your</span>App</h1>
        </div>

        <ul className="p-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            if (item.hiddenFor && item.hiddenFor.toLowerCase() === role.toLowerCase()) return null;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center gap-3 ${isActive ? "bg-blue-600 text-white shadow-md shadow-blue-700/50" : "hover:bg-blue-700 text-gray-200 hover:text-white"}`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.name}
                </button>
              </li>
            );
          })}
        </ul>

        {username && (
          <div className="absolute bottom-0 w-full p-4 border-t border-blue-800 bg-blue-800">
            <button onClick={() => setShowUserMenu((prev) => !prev)} className="flex justify-between items-center w-full font-medium text-gray-200 hover:text-white transition-colors">
              <span className="flex items-center gap-2"><FaUserCircle className="text-xl text-orange-400" /> {username}</span>
              <svg className={`w-4 h-4 transform transition-transform ${showUserMenu ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showUserMenu && (
              <div className="mt-2 text-sm space-y-2">
                <button onClick={handleClickLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 font-semibold px-2 py-1 rounded">
                  <FiLogOut />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {showConfirmLogout && (
        <ConfirmModal
          isOpen={showConfirmLogout}
          title="Confirm Logout"
          message="Are you sure you want to log out from the application?"
          onCancel={() => setShowConfirmLogout(false)}
          onConfirm={handleConfirmLogout}
        />
      )}
    </>
  );
}
