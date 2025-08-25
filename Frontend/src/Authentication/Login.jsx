import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../Authentication/AuthenticationCss/Login.css";
import logo from "../Authentication/AuthenticationImg/BackgroundAuthentication.png";

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
      const response = await fetch("", {
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
      const roles = decoded.role || decoded.roles;

      if (Array.isArray(roles) ? roles.includes("User") : roles === "User") {
        navigate("/user");
      } else {
        navigate("/admin");
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
      <div className="Welcome-Page-Section" onClick={(e) => e.stopPropagation()}>
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
