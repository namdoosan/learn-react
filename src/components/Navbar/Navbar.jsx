import { useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";

export default function Navbar({ username, toggleSidebar, isSidebarOpen }) {
  const location = useLocation();

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case "/home":
        return "Dashboard Overview";
      case "/manage-product":
        return "Product Management";
      case "/manage-user":
        return "User Management";
      default:
        if (pathname.startsWith("/manage-user")) return "User Management";
        if (pathname.startsWith("/manage-product")) return "Product Management";
        return "Application";
    }
  };

  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <div className="flex justify-between items-center px-6 py-4 bg-white/95 backdrop-blur-md rounded-b-xl shadow-lg shadow-gray-200/50 border-b border-gray-100 font-sans">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="text-gray-600 hover:text-blue-600 transition-colors focus:outline-none">
              <IoMenu size={28} />
            </button>
            <h1 className="text-2xl font-bold text-gray-800 drop-shadow-sm">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-orange-500 transition-colors focus:outline-none relative">
              <FaRegBell size={24} />
            </button>
            <div className="flex items-center gap-2">
              <MdOutlineAccountCircle className="text-blue-600 text-3xl" />
              <span className="text-gray-700 font-medium hidden sm:block">Hello, {username || "User"}!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
