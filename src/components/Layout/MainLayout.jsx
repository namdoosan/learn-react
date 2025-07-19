import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

export default function MainLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [username, setUsername] = useState("");
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else if (location.state?.username) {
      setUsername(location.state.username);
      sessionStorage.setItem("username", location.state.username);
    }

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [location.state]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-64 lg:ml-64" : "ml-0 lg:ml-0"}`}>
        <Navbar username={username} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-6 pt-24 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
