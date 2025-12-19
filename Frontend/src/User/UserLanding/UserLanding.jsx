import Header from '../../User/UserDashBoardComponents/UserDashBoardHeader';
import UserDashPanel from '../../User/UserDashBoardComponents/UserDashBoardPanel'
import UserDashBoardPanel from "../UserDashBoardLogicPanel/UserDashPanelDashBoard"

function UserLanding(){
    return(
        <div>
           <Header />
           
           <UserDashPanel />
        </div>
    )
}

export default UserLanding;