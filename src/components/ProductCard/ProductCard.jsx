// src/components/ProductCard/ProductCard.jsx

import React from 'react';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-pink-100/50 p-5 flex flex-col items-center gap-3 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-pink-200/60 border border-pink-100 cursor-pointer">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover rounded-xl border-2 border-pink-200 shadow-sm" // Border pink pada gambar
      />
      <h4 className="text-xl font-bold text-pink-700 mt-2 text-center font-['Pacifico', cursive]">{product.title}</h4>
      <p className="text-pink-500 text-sm font-medium">{product.brand}</p>
      {/* Asumsi product.rating adalah angka, kita bisa tampilkan visual bintang */}
      <div className="flex items-center gap-1 text-yellow-500">
        {'★'.repeat(Math.round(product.rating))}
        {'☆'.repeat(5 - Math.round(product.rating))}
        <span className="ml-1 text-pink-400 text-xs">({product.rating?.toFixed(1) || 'N/A'})</span>
      </div>
      <p className="text-pink-600 font-extrabold text-2xl mt-1">
        $ {product.price.toLocaleString('id-ID')} {/* Format mata uang Indonesia */}
      </p>
    </div>
  );
}