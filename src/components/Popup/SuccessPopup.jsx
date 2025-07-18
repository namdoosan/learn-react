// components/Popup/SuccessPopup.jsx
import { CheckCircle2 } from "lucide-react";

export default function SuccessPopup({ message, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[1000]">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full text-center">
        <CheckCircle2 className="text-green-500 mx-auto" size={48} />
        <h2 className="text-xl font-semibold mt-4 text-green-600">{message}</h2>
        <button
          onClick={onClose}
          className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          OK
        </button>
      </div>
    </div>
  );
}