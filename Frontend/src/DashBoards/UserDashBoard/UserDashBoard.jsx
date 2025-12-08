import { useState, useEffect,createContext } from "react";
import api from '../../Connect/Connect';
import '../DashBoardsCss/UserDashBoard.css';
import UserDashBoardPanel from "../../User/UserDashBoardLogicPanel/UserDashPanelDashBoard";
import UserLanding from '../../User/UserLanding/UserLanding'
export const UserContext = createContext();

function UserDashBoard() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${api}/api/Authentication/getUser`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="user-dashboard">
      <UserContext.Provider value={user}>
      
      <UserLanding />
      </UserContext.Provider>
    </div>
  );
}

export default UserDashBoard;
