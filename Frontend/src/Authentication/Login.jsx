import { useState } from "react";
import { jwtDecode } from "jwt-decode"; 
import { useNavigate } from "react-router-dom";
import api from "../Connect/Connect";
import "../Authentication/AuthenticationCss/Login.css"

function WelcomePageLogin({ onClose }) {
  const [userName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function Login(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    
    const info = { username: userName, password: Password };

    try {
      const response = await fetch(
        `${api}/api/Authentication/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(info),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error("Fail to login: " + text);
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      const decoded = jwtDecode(data.token); 
      console.log("Decoded JWT:", decoded);

      const role =
        decoded["role"] ||
        decoded["roles"] ||
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      const normalizedRole = Array.isArray(role)
        ? role.map((r) => r.toLowerCase())
        : [role?.toLowerCase()];

      if (normalizedRole.includes("user")) navigate("/user");
      else if (normalizedRole.includes("admin")) navigate("/admin");
      else navigate("/");

      setUserName("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
     <div onClick={onClose} className="Welcome-Page-Login-Overlay">
    <div onClick={(e) => e.stopPropagation()} className="Welcome-Page-Section">
      <div className="login-header">
        <h2>Login</h2>
        <p>Enter your credentials</p>
      </div>
      <form onSubmit={Login} className="welcome-page-form">
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  </div>
  );
}

export default WelcomePageLogin;
