// src/components/Button/Button.jsx
export default function Button({
  children,
  type = "submit",      // ⬅️ dari "button" ke "submit"
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-5 py-2 rounded-md font-semibold shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-kpink-dark ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
