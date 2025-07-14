import "./Button.css";

export default function Button({ children, onClick, type = "button" }) {
  return (
    <button type={type} onClick={onClick} className="button">
      {children}
    </button>
  );
}
