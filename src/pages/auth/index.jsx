import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import "./AuthPage.css";
import logoImage from "../../assets/login-banner.png";

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      alert("Username dan password harus diisi!");
      return;
    }
    navigate("/home", { state: { username } });
  };

  return (
    <div className="auth-page">
      <img src={logoImage} alt="Login Banner" className="login-banner" />
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <Input
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
}
