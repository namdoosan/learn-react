
import React from "react";

export default function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  className, // Tambahkan ini untuk menerima kelas tambahan
  multiline = false, // Tetap pertahankan jika digunakan untuk textarea
  ...props // Tangkap sisa props dari Controller
}) {
  const InputElement = multiline ? 'textarea' : 'input';

  return (
    <div className="mb-2">
      <label
        htmlFor={name}
        className="block mb-1 text-pink-700 font-medium text-sm" // Mengganti warna label ke pink
      >
        {label}
      </label>
      <InputElement
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        // Menggabungkan kelas default dengan kelas yang diterima dari prop 'className'
        className={`
          w-full px-4 py-2 border-2 border-pink-300 rounded-md text-sm
          focus:outline-none focus:ring-1 focus:ring-pink-400
          focus:border-pink-500 transition-all duration-200
          ${className || ''}
        `}
        {...props} // Pastikan ini tetap ada untuk react-hook-form
      />
    </div>
  );
}