import { useState, useEffect, useContext } from 'react';
import '../UserDashBoardLogicPanelCss/UserDashPanelDashBoard.css';
import api from '../../Connect/Connect';
import firstfriend from '../UserDashBoardImg/UserDashBoard/firstfriend.png';
import secondfriend from '../UserDashBoardImg/UserDashBoard/secondfriend.png';
import thirdfriend from '../UserDashBoardImg/UserDashBoard/thirdfriend.png';
import fierdfriend from '../UserDashBoardImg/UserDashBoard/fierdfriend.png';
import femfriend from '../UserDashBoardImg/UserDashBoard/femfriend.png';
import invite from "../UserDashBoardImg/UserDashBoard/invite.png";
import book from "../UserDashBoardImg/UserDashBoard/Book.png";
import { UserContext } from "../../DashBoards/UserDashBoard/UserDashBoard";
import todorecentlyimg from "../UserDashBoardImg/UserDashBoard/todo-recently.png";
import taskstatus from "../UserDashBoardImg/UserDashBoard/TaskStatus.png";

function UserDashBoard() {
    const user = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [completedTask, setCompletedTask] = useState([]);
    const [recentlyTask, setRecentlyTask] = useState([]);
    const [statistic, setStatistic] = useState([]);

    const [completedPage, setCompletedPage] = useState(1);
    const completedItemsPerPage = 2;
    const completedTotalPages = Math.ceil(completedTask.length / completedItemsPerPage);
    const completedStart = (completedPage - 1) * completedItemsPerPage;
    const completedToShow = completedTask.slice(completedStart, completedStart + completedItemsPerPage);

    const [recentPage, setRecentPage] = useState(1);
    const recentItemsPerPage = 4;
    const recentTotalPages = Math.ceil(recentlyTask.length / recentItemsPerPage);
    const recentStart = (recentPage - 1) * recentItemsPerPage;
    const recentToShow = recentlyTask.slice(recentStart, recentStart + recentItemsPerPage);

    useEffect(() => {
        const fetchRecentlyCreatedTask = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${api}/api/ToDo/recently-created-task`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "true",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                const data = await response.json();
                setRecentlyTask(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRecentlyCreatedTask();
    }, []);

    useEffect(() => {
        const fetchStatisticUser = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${api}/api/ToDo/get-task-statistics`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "true",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                const data = await response.json();
                
                setStatistic(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchStatisticUser();
    }, []);

    useEffect(() => {
        const fetchCompletedTask = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${api}/api/ToDo/get-all-completed-todo-items`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "true",
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (!response.ok) throw new Error(`Error ${response.status}`);
                const data = await response.json();
                setCompletedTask(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCompletedTask();
    }, []);

   
    const completed = statistic.completedTasks || 0;
    const inProgress = statistic.inProgressTasks || 0;
    const pending = statistic.pendingTasks || 0;

    const total = completed + inProgress + pending;

    const completedPercent = total ? Math.round((completed / total) * 100) : 0;
    const inProgressPercent = total ? Math.round((inProgress / total) * 100) : 0;
    const pendingPercent = total ? Math.round((pending / total) * 100) : 0;
    

    return (
        <div className='dash-board-task-container'>

            <div className='dash-board-header'>
                <div className='dash-board-left-side'>
                    <h1>Welcome back, {user.userName}</h1>
                </div>
                <div className='dash-board-right-side'>
                    <div className='dash-board-right-side-img'>
                        <img src={firstfriend} alt="" />
                        <img src={secondfriend} alt="" />
                        <img src={thirdfriend} alt="" />
                        <img src={fierdfriend} alt="" />
                        <img src={femfriend} alt="" />
                    </div>
                    <div className='dash-board-right-side-button'>
                        <button><img src={invite} alt="" /> Invite</button>
                    </div>
                </div>
            </div>

            <div className='dash-board-sections'>

                <div className='dash-board-first-group'>
                    <div className='dash-board-info'>
                        <div className='dash-board-info-header'>
                            <img src={todorecentlyimg} alt="" />
                            <h3>Last Created Task</h3>
                        </div>
                        <div className='recent-tasks-list'>
                            {loading && <p>Loading tasks...</p>}
                            {error && <p className="error-text">{error}</p>}
                            {!loading && !error && recentToShow.length === 0 && <p className="no-tasks">No recent tasks</p>}

                            {recentToShow.map(task => {
                                const days = Math.floor((Date.now() - new Date(task.atCreated)) / 86400000);
                                return (
                                    <div key={task.id} className='recent-task-card'>
                                        <div className='recent-task-header'>{task.header}</div>
                                        <div className='recent-task-desc'>
                                            {task.description.length > 100
                                                ? task.description.slice(0, 100) + "..."
                                                : task.description}
                                        </div>
                                        <div className='recent-task-date'>
                                            Created: {days === 0 ? "Today" : `${days} day${days > 1 ? "s" : ""} ago`}
                                        </div>
                                    </div>
                                );
                            })}

                            {recentlyTask.length > recentItemsPerPage && (
                                <div className="pagination-completed">
                                    <button disabled={recentPage === 1} onClick={() => setRecentPage(p => p - 1)}>Prev</button>
                                    <span>{recentPage} / {recentTotalPages}</span>
                                    <button disabled={recentPage === recentTotalPages} onClick={() => setRecentPage(p => p + 1)}>Next</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='dash-board-second-group'>
                    <div className='dash-board-statistic'>
                        <div className='dash-board-statistic-header'>
                            <img src={taskstatus} alt="" />
                            <h3>Statistic</h3>
                        </div>

                        <div className='dash-board-statistic-main'>
                            <div className="stat-circle">
                                <div className="circle" style={{ background: `conic-gradient(#4CAF50 ${completedPercent * 3.6}deg, #e0e0e0 0deg)` }}>
                                    <div className="circle-inner">{completedPercent}%</div>
                                </div>
                                <div className="stat-text"><span className="dot green"></span> Completed</div>
                            </div>

                            <div className="stat-circle">
                                <div className="circle" style={{ background: `conic-gradient(#1E40FF ${inProgressPercent * 3.6}deg, #e0e0e0 0deg)` }}>
                                    <div className="circle-inner">{inProgressPercent}%</div>
                                </div>
                                <div className="stat-text"><span className="dot blue"></span> In Progress</div>
                            </div>

                            <div className="stat-circle">
                                <div className="circle" style={{ background: `conic-gradient(#E53935 ${pendingPercent * 3.6}deg, #e0e0e0 0deg)` }}>
                                    <div className="circle-inner">{pendingPercent}%</div>
                                </div>
                                <div className="stat-text"><span className="dot red"></span> Not Started</div>
                            </div>
                        </div>
                    </div>

                    <div className='dash-board-completed'>
                        <div className='dash-board-completed-header'>
                            <img src={book} alt="" />
                            <h3>Last Completed Task</h3>
                        </div>
                        <div className="dash-board-completed-header-info">
                            {!loading && !error && completedToShow.length === 0 && (
                                <p className="no-completed-text">No new completed tasks</p>
                            )}

                            {completedToShow.map(task => {
                                const days = Math.floor((Date.now() - new Date(task.completedAt)) / 86400000);
                                return (
                                    <div key={task.id} className="completed-task-item">
                                        <div className="completed-task-header"><strong>{task.header}</strong></div>
                                        <p className="completed-task-desc">
                                            {task.description.length > 60
                                                ? task.description.slice(0, 60) + "..."
                                                : task.description}
                                        </p>
                                        <div className="completed-task-date">
                                            Completed: {days === 0 ? "Today" : `${days} day${days > 1 ? "s" : ""} ago`}
                                        </div>
                                    </div>
                                );
                            })}

                            {completedTask.length > completedItemsPerPage && (
                                <div className="pagination-recent">
                                    <button disabled={completedPage === 1} onClick={() => setCompletedPage(p => p - 1)}>Prev</button>
                                    <span>{completedPage} / {completedTotalPages}</span>
                                    <button disabled={completedPage === completedTotalPages} onClick={() => setCompletedPage(p => p + 1)}>Next</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashBoard;
