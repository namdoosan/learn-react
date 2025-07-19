import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MdOutlineAttachMoney, MdOutlineInventory } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const location = useLocation();

  const dashboardData = { totalSales: 1250, revenue: 752000, totalProducts: 45, newOrders: 8 };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("username");
    if (storedUser) setUsername(storedUser);
    else if (location.state?.username) setUsername(location.state.username);
  }, [location.state]);

  const formatCurrency = (amount) =>
  
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(amount);

  const Card = ({ title, icon: Icon, value, subtitle, bgClass }) => (
    <div className={`bg-gradient-to-br ${bgClass} rounded-xl shadow-lg p-6 flex flex-col items-start justify-between text-white transform transition-transform duration-300 hover:scale-[1.02]`}>
      <div className="flex items-center justify-between w-full mb-3">
        <h2 className="text-xl font-bold">{title}</h2>
        <Icon className="text-4xl opacity-70" />
      </div>
      <p className="text-4xl font-extrabold animate-pulse">{value}</p>
      <p className="text-white/80 mt-2">{subtitle}</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center p-6 font-sans">
      <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-xl shadow-xl shadow-blue-200/50 p-8 text-center max-w-3xl w-full border border-gray-100 mb-8 transform transition-transform duration-300 hover:scale-[1.01]">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
          Welcome, <span className="text-blue-600">{username || "Guest"}</span>!
        </h1>
        <p className="text-lg text-gray-600 mb-6 font-medium">
          Your dashboard provides a quick overview of your application's performance.
        </p>
        <div className="text-6xl mb-4 text-blue-500">📈📊✨</div>
        <p className="text-gray-500 italic">"Efficiency through insights, success through action."</p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Sales" icon={MdOutlineAttachMoney} value={`${dashboardData.totalSales} items`} subtitle="Successful transactions" bgClass="from-blue-500 to-blue-700 shadow-blue-500/40" />
        <Card title="Total Revenue" icon={MdOutlineAttachMoney} value={formatCurrency(dashboardData.revenue)} subtitle="Generated income" bgClass="from-orange-500 to-orange-700 shadow-orange-500/40" />
        <Card title="Total Products" icon={MdOutlineInventory} value={`${dashboardData.totalProducts} SKUs`} subtitle="Items currently in stock" bgClass="from-green-500 to-green-700 shadow-green-500/40" />
        <Card title="New Orders" icon={FaUsers} value={`${dashboardData.newOrders} today`} subtitle="Recent customer requests" bgClass="from-purple-500 to-purple-700 shadow-purple-500/40" />
      </div>
    </div>
  );
}