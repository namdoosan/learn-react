import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "./AuthPage.css"; // Import CSS for styling
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";


export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const handleLogin = (e) => { // Function to handle login
    // Mencegah form dari submit default
    e.preventDefault();


    //trim untuk menghapus spasi di awal dan akhir
    //Jika username atau password kosong, tampilkan alert
    if (!username.trim() || !password.trim()) {
      alert("Username dan password harus terisi!");
      return;
    }

    // Login sukses → pindah ke home
    navigate("/home");
  };

  return (
    // Membungkus form dengan div untuk styling
    <div className="auth-container">
        
      <form className="auth-form" onSubmit={handleLogin}>
        <h1>Login</h1>
        <Input
          label="Username"
          type="text"
          value={username}
          // Menggunakan onChange untuk menangani perubahan input
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
