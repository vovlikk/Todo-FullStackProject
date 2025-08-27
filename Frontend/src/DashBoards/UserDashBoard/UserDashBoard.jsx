import { useState, useEffect, createContext } from "react";
import api from '../../Connect/Connect';
import '../DashBoardsCss/UserDashBoard.css';
import Header from '../../User/UserDashBoardComponents/UserDashBoardHeader';
import Panel from '../../User/UserDashBoardComponents/UserDashBoardPanel';
import UserDashBoardPanel from '../../User/UserDashBoardComponents/UserDashBoardPanel'

export const UserContext = createContext(null);

function UserDashBoard() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${api}/api/Authentication/getUser`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchuser();
  }, []);

  return (
    <div className="user-dashboard">
      <Header />

      <UserContext.Provider value={user}>
        <Panel />
      
      </UserContext.Provider>
    </div>
  );
}

export default UserDashBoard;
