import "./ActionButton.css";

export default function ActionButton({ icon, alt, onClick, title }) {
  return (
    <button className="action-btn" onClick={onClick} title={title}>
      <img src={icon} alt={alt} />
    </button>
  );
}