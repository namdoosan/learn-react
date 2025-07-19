import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-6 text-center overflow-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-200/50 p-10 max-w-lg w-full border border-blue-200 transform transition-transform duration-300 hover:scale-[1.01]">
        <FaExclamationTriangle className="text-blue-500 text-7xl mb-8 mx-auto animate-pulse" />
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4 font-['Inter', sans-serif]">
          Oops! Page Not Found
        </h1>
        <p className="text-blue-600 text-lg mb-8 font-semibold">
          The page you're looking for could not be found.
          It might have been moved or deleted.
        </p>
        <button
          onClick={() => navigate("/home")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-full shadow-lg shadow-blue-300/50 transform transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
        >
          <span className="text-xl">🏠</span> Back to Homepage
        </button>
      </div>
    </div>
  );
}