import { useState } from "react";
import "../Authentication/AuthenticationCss/Register.css";
import api from '../Connect/Connect';

function WelcomeRegister({ onClose }) {
  const [regemail, setRegEmail] = useState("");
  const [regusername, setRegUserName] = useState("");
  const [regpassword, setRegPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const lowercase = /[a-z]/.test(regpassword);
  const uppercase = /[A-Z]/.test(regpassword);
  const number = /\d/.test(regpassword);
  const numbermin = regpassword.length >= 8;
  const done = lowercase && uppercase && number && numbermin;

  async function Register(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const info = { email: regemail, username: regusername, password: regpassword };

    if (!done) {
      setError("Password does not meet requirements");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://c12886971e6c.ngrok-free.app/api/Authentication/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify(info),
        }
      );

      console.log("Raw response:", response);
      console.log("Status:", response.status);
      console.log("Headers:", [...response.headers]);

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.message || JSON.stringify(errorData));
        } else {
          const text = await response.text();
          throw new Error(text);
        }
      }

      let data = {};
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      }

      alert("Was successful registered");
      setRegEmail("");
      setRegPassword("");
      setRegUserName("");
    } catch (err) {
      console.error("Registration error:", err);
      setError("Fail to register: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="WelcomePageRegisterOverlay" onClick={onClose}>
      <div className="WelcomePageRegisterSection" onClick={(e) => e.stopPropagation()}>
        <h2>Create Account</h2>
        <form className="register-form" onSubmit={Register}>
          <input
            type="email"
            placeholder="Enter your Email"
            value={regemail}
            onChange={(e) => setRegEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter your Username"
            value={regusername}
            onChange={(e) => setRegUserName(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your Password"
            value={regpassword}
            onChange={(e) => setRegPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          <ul>
            <li style={{ color: lowercase ? "green" : "red" }}>
              {lowercase ? "Ok" : "No"} You need 1 Lower letter
            </li>
            <li style={{ color: uppercase ? "green" : "red" }}>
              {uppercase ? "Ok" : "No"} You need 1 Upper letter
            </li>
            <li style={{ color: number ? "green" : "red" }}>
              {number ? "Ok" : "No"} You need numbers in your password
            </li>
            <li style={{ color: numbermin ? "green" : "red" }}>
              {numbermin ? "Ok" : "No"} You need min 8 symbols
            </li>
          </ul>

          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default WelcomeRegister;
