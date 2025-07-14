import { useState } from "react";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";


export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Username dan password harus terisi!");
      return;
    }

    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <h2>Welcome, {username}!</h2>;
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <Input
        label="Username"
        type="text"
        value={username}
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
  );
}
