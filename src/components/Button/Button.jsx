import React from "react";

export default function Button({
  children,
  type = "submit",
  className = "",
  variant = "primary",
  ...props
}) {
  const baseStyles = "px-5 py-2 rounded-md font-semibold shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1";

  const variants = {
    primary: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-400",
    secondary: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-400",
    info: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-400",
    default: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-300",
  };

  const variantStyles = variants[variant] || variants.default;

  return (
    <button type={type} className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
}
