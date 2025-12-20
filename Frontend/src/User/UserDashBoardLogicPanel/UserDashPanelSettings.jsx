import { useState, useContext } from 'react';
import '../UserDashBoardLogicPanelCss/UserDashPanelSettings.css';
import { UserContext } from "../../DashBoards/UserDashBoard/UserDashBoard";
import emailimg from '../UserDashBoardImg/UserDashBoardSettingsImg/email.png';
import telefone from '../UserDashBoardImg/UserDashBoardSettingsImg/smartfone.png';
import userimg from '../UserDashBoardImg/UserDashBoardSettingsImg/user.png';
import api from "../../Connect/Connect"

function DashBoardPanelSettings() {
  const user = useContext(UserContext);

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (password.length < minLength) return "Password must be at least 8 characters long";
    if (!hasUpper) return "Password must contain at least one uppercase letter";
    if (!hasLower) return "Password must contain at least one lowercase letter";
    if (!hasNumber) return "Password must contain at least one number";

    return null;
  }

 
  async function changeName() {
    if (!username.trim()) return alert("Please enter a new name");
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${api}/api/UserLogic/change-name`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userName: username })
      });

      if (!response.ok) {
        const errText = await response.text();
        alert("Error: " + errText);
        return;
      }

      alert("Name changed successfully!");
      setUserName('');
    } catch (err) {
      setError(err.message);
    }
  }

  
  async function changeEmail() {
    if (!email.trim()) return alert("Please enter a new email");
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${api}/api/UserLogic/change-email`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ email: email })
      });

      if (!response.ok) {
        const errText = await response.text();
        alert("Error: " + errText);
        return;
      }

      alert("Email changed successfully!");
      setEmail('');
    } catch (err) {
      setError(err.message);
    }
  }

  
  async function changePassword() {
    const errorMsg = validatePassword(password);
    if (errorMsg) {
      alert(errorMsg);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${api}/api/UserLogic/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ password })
      });

      if (!response.ok) {
        const errText = await response.text();
        alert("Error: " + errText);
        return;
      }

      alert("Password changed successfully!");
      localStorage.removeItem('token');
      window.location.replace("/");

    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="user-dash-panel-settings-container">
      <div className="user-dash-panel-text">
        <h1>Account Information</h1>
      </div>

      <div className="user-dash-panel-info">
        <div className='user-dash-panel-info-section'>
          <img src={userimg} alt="" />
          <h3>{user.userName}</h3>
        </div>

        <div className='user-dash-panel-info-section'>
          <img src={emailimg} alt="" />
          <h2>{user.email}</h2>
        </div>
      </div>

      <div className="user-dash-panel-change-info">
        <div className='user-dash-panel-change-info-header'>
          <h1>Change Your Information</h1>
        </div>

        <div className="user-dash-panel-info-section">
          <h3>Name</h3>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUserName(e.target.value)} 
            placeholder={user.userName || ""}
          />
        </div>

        <div className="user-dash-panel-info-section">
          <h3>Email</h3>
          <input 
            type="text" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder={user.email || ""}
          />
        </div>

        <div className="user-dash-panel-info-section">
          <h3>Password</h3>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <div className="user-dash-panel-buttons">
          <button onClick={changeName}>Change Name</button>
          <button onClick={changeEmail}>Change Email</button>
          <button onClick={changePassword}>Change Password</button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default DashBoardPanelSettings;
