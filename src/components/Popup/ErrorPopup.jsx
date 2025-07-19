import React, { useEffect } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5'; // Menggunakan ikon silang untuk error

export default function ErrorPopup({ message, onClose }) {
  useEffect(() => {
    // Otomatis menutup popup setelah 3 detik
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-red-500 text-white rounded-lg shadow-xl p-6 flex items-center space-x-4 animate-fade-in-down transform transition-transform duration-300">
        <IoCloseCircleOutline className="text-3xl flex-shrink-0" />
        <span className="text-lg font-semibold">{message}</span>
        <button
          onClick={onClose}
          className="ml-auto p-1 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-colors"
          aria-label="Close"
        >
          <IoCloseCircleOutline className="text-2xl" />
        </button>
      </div>
    </div>
  );
}