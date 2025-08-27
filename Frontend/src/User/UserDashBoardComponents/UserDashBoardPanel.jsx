import { useContext, useState } from "react";
import "../UserDashBoardComponentsCss/UserDashBoardPanel.css";
import { UserContext } from "../../DashBoards/UserDashBoard/UserDashBoard";
import logout from "../UserDashBoardImg/UserDashPanelImg/Logout.svg";
import DashBoardPanelSettings from "../UserDashBoardLogicPanel/UserDashPanelSettings";

function UserDashBoardPanel() {
  const userinfo = useContext(UserContext);
  const [showsection, setShowSection] = useState(null);

  return (
    <div className="user-dash-board-wrapper">
      <div className="user-dash-board-panel-container">
        <div className="user-dash-board-panel-section">
          <div className="user-dash-board-panel-info">
            <h3>{userinfo.userName}</h3>
            <h2>{userinfo.email}</h2>
          </div>

          <div className="user-dash-board-panel-buttons-container">
            <div className="user-panel-button">
              <button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                </svg>
                Dashboard
              </button>
            </div>

            <div className="user-panel-button">
              <button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l4 4h-3v6h-2V6H8l4-4zM4 14h16v2H4v-2zm0 4h16v2H4v-2z" />
                </svg>
                Vital Task
              </button>
            </div>

            <div className="user-panel-button">
              <button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 14H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2z" />
                </svg>
                My Task
              </button>
            </div>

            <div className="user-panel-button">
              <button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 3h18v2H3V3zm0 14h18v2H3v-2zm0-7h18v2H3V10z" />
                </svg>
                Task Categories
              </button>
            </div>

            <div className="user-panel-button">
              <button onClick={() => setShowSection("settings")}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0-6C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
                Settings
              </button>
            </div>

            <div className="user-panel-button">
              <button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
                Help
              </button>
            </div>
          </div>

          <div className="user-panel-button-exit">
            <button>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 13v-2H7V9l-5 3 5 3v-2h9zM19 3h-8v2h8v14h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="user-dash-board-content">
        {showsection === "dashboard" && <h1>Dashboard content</h1>}
        {showsection === "vital" && <h1>Vital Task content</h1>}
        {showsection === "mytask" && <h1>My Task content</h1>}
        {showsection === "categories" && <h1>Task Categories content</h1>}
        {showsection === "settings" && <DashBoardPanelSettings />}
        {showsection === "help" && <h1>Help content</h1>}
      </div>
    </div>
  );
}

export default UserDashBoardPanel;
    