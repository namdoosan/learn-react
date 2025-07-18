export default function ActionButton({ icon, alt, onClick, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="bg-transparent border-none p-1 cursor-pointer"
    >
      <img
        src={icon}
        alt={alt}
        className="w-5 h-5 transition-transform duration-200 hover:scale-110"
      />
    </button>
  );
}
