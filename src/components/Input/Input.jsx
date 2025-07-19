import React from "react";

export default function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  className = "",
  multiline = false,
  ...props
}) {
  const InputElement = multiline ? "textarea" : "input";

  return (
    <div className="mb-2">
      <label htmlFor={name} className="block mb-1 text-gray-700 font-medium text-sm">
        {label}
      </label>
      <InputElement
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-2 border-2 border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-600 transition-all duration-200 ${className}`}
        {...props}
      />
    </div>
  );
}
