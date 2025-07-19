import React, { useState, useRef, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FiMoreVertical, FiEdit, FiTrash2 } from "react-icons/fi";
import { formatUSD } from "@/helpers/formatCurrency";

export default function ProductCard({ product, onEdit, onDelete, onViewDetails }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    onEdit?.();
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    onDelete?.();
  };

  const handleCardClick = () => onViewDetails?.();

  const renderStars = (rating) => {
    const fullStars = Math.round(rating);
    const emptyStars = 5 - fullStars;
    return (
      <>
        {Array.from({ length: fullStars }).map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-400" />
        ))}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-gray-300" />
        ))}
      </>
    );
  };

  return (
    <div onClick={handleCardClick} className="bg-white rounded-xl shadow-lg shadow-gray-100/50 p-5 flex flex-col gap-3 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-200/60 border border-gray-100 relative font-sans cursor-pointer">
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center rounded-lg">
            <svg className="h-10 w-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 16.5V7a2 2 0 012-2h12a2 2 0 012 2v9.5a.5.5 0 01-.5.5H4.5a.5.5 0 01-.5-.5zM12 9a3 3 0 100 6 3 3 0 000-6zM8 12a1 1 0 11-2 0 1 1 0 012 0zM18 12a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </div>
        )}
        <img
          src={product.thumbnail}
          alt={product.title}
          className={`w-full h-full object-cover rounded-lg border-2 border-gray-200 shadow-sm transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        <div ref={menuRef} className="absolute top-2 right-2 z-20">
          <button onClick={handleMenuToggle} className="p-1.5 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white" aria-label="Product actions">
            <FiMoreVertical size={20} />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-30">
              <button onClick={handleEditClick} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                <FiEdit /> Edit
              </button>
              <button onClick={handleDeleteClick} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                <FiTrash2 /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <h4 className="text-xl font-bold text-gray-800 mt-2 text-center">{product.title}</h4>
      <p className="text-gray-500 text-sm font-medium">{product.brand}</p>
      <div className="flex items-center gap-1 text-yellow-500">
        {renderStars(product.rating)}
        <span className="ml-1 text-gray-400 text-xs">({product.rating?.toFixed(1) || "N/A"})</span>
      </div>
      <p className="text-blue-600 font-extrabold text-2xl mt-1">{formatUSD(product.price)}</p>
    </div>
  );
}
