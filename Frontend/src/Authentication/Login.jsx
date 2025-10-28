import { useState } from "react";
import jwtDecode from "jwt-decode"; // default import для v3.1.2
import { useNavigate } from "react-router-dom";
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

    try {
      const response = await fetch(`https://565aae370d52.ngrok-free.app/api/Authentication/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      "ngrok-skip-browser-warning": "true",
      body: JSON.stringify(info),
    });

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
    <div onClick={onClose} style={{ padding: "20px" }}>
      <div onClick={(e) => e.stopPropagation()}>
        <form onSubmit={Login} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
          {error && <div style={{ color: "red" }}>{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default WelcomePageLogin;
