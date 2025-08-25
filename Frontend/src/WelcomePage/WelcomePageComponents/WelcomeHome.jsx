import homeimg from '../WelcomePageImg/todowelcomeimg.png'
import '../WelcomePageComponentsCss/WelcomeHome.css'
function WelcomeHome(){
    return(
        <div className="welcome-container">
            <div className="welcome-home-section">
                <div className="welcome-home-img">
                <img src={homeimg} alt="" />
                </div>
                <div className="welcome-home-text">
                    <h3>Welcome to Your ToDoList!</h3>
                    <p>Organize your tasks easily and efficiently. <br /> Create to-do lists, set priorities, and mark completed tasks. Everything you need for a productive day — all in one place.</p>
                </div>
            </div>
        </div>
    )
}

export default WelcomeHome;