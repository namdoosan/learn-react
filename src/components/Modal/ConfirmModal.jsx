// components/Modal/ConfirmModal.jsx

import React from 'react';
import Button from "@/components/Button/Button"; // Pastikan path ini benar

export default function ConfirmModal({ isOpen, title, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    // Div ini harus menutupi seluruh layar dan memiliki z-index tinggi
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[1000]">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full text-center">
        <h2 className="text-xl font-semibold mb-4 text-blue-900">{title}</h2>
        <div className="flex justify-center gap-4 mt-6">
          <Button onClick={onCancel} variant="secondary">
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="primary">
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
}