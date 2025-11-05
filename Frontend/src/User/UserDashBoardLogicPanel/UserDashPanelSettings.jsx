import { useState,useContext } from 'react';
import '../UserDashBoardLogicPanelCss/UserDashPanelSettings.css';
import { UserContext } from "../../DashBoards/UserDashBoard/UserDashBoard";
import emailimg from '../UserDashBoardImg/UserDashBoardSettingsImg/email.png';
import telefone from '../UserDashBoardImg/UserDashBoardSettingsImg/smartfone.png';
import userimg from '../UserDashBoardImg/UserDashBoardSettingsImg/user.png';


function DashBoardPanelSettings() {
  const api = useContext(UserContext);
 
  return (
    <div className="user-dash-panel-settings-container">
      <div className="user-dash-panel-text">
        <h1>Account Information</h1>
      </div>

      <div className="user-dash-panel-info">

        <div className='user-dash-panel-info-section'>
        <img src={userimg} alt="" />
        <h3>{api.userName}</h3>
        </div>

        <div className='user-dash-panel-info-section'>
        <img src={emailimg} alt="" />
        <h2>{api.email}</h2>
        </div>

        <div className='user-dash-panel-info-section'>
        <img src={telefone} alt="" />
        <h2>telefone</h2>
        </div>
      </div>

      <div className="user-dash-panel-change-info">
        <div className="user-dash-panel-info-section">
          <h3>Name</h3>
          <input type="text" />
        </div>
        <div className="user-dash-panel-info-section">
          <h3>Name</h3>
          <input type="text" />
        </div>
        <div className="user-dash-panel-info-section">
          <h3>Email</h3>
          <input type="text" />
        </div>
        <div className="user-dash-panel-info-section">
          <h3>Number</h3>
          <input type="text" />
        </div>
       

        <div className="user-dash-panel-buttons">
          <button>Save Changes</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DashBoardPanelSettings;
