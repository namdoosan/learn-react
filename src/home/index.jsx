import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="home-container">
      <h1>Selamat datang di Home!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
