import "./Input.css";

export default function Input({ label, name, value, onChange, type = "text", required }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}