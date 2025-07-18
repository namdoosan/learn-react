import { FaSpinner } from "react-icons/fa";
import { createPortal } from "react-dom";

export default function LoadingModal({ isOpen }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
        <FaSpinner className="animate-spin text-3xl text-blue-800 mb-3" />
        <p className="text-blue-900 font-semibold">Logging out...</p>
      </div>
    </div>,
    document.body
  );
}
