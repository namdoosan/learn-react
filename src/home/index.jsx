import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Navigate back to the login page
    // Optionally, you can clear any authentication state here
  };

  return (
    <div className="home-container">
      <h1>Selamat datang di Home!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
