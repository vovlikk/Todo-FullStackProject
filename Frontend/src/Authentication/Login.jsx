import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../Authentication/AuthenticationCss/Login.css";
import logo from "../Authentication/AuthenticationImg/BackgroundAuthentication.png";
import api from "../Connect/Connect";

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
      const response = await fetch(`${api}/api/Authentication/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error("Fail to login " + text);
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

      if (normalizedRole.includes("user")) {
        navigate("/user");
      } else if (normalizedRole.includes("admin")) {
        navigate("/admin");
      } else {
        navigate("/");
      }

      setUserName("");
      setPassword("");
    } catch (err) {
      setError("Fail to login: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="Welcome-Page-Login-Overlay" onClick={onClose}>
      <div
        className="Welcome-Page-Section"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Login to your account</p>
        </div>

        <form className="welcome-page-form" onSubmit={Login}>
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <div className="error-message">{error}</div>}
        </form>

        <div className="signup-section">
          <p>Don't have an account?</p>
          <button className="signup-btn">Create Account</button>
        </div>
      </div>
    </div>
  );
}

export default WelcomePageLogin;
