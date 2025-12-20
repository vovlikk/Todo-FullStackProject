import '../../User/UserDashBoardComponentsCss/UserDashBoardHeader.css';
import { useState, useEffect } from 'react';
import search from '../../User/UserDashBoardImg/Search.png';
import calendar from '../../User/UserDashBoardImg/calendar.png';
import notification from '../../User/UserDashBoardImg/notification.png';
import api from '../../Connect/Connect';

function UserDashBoardHeader() {
    const [searchText, setSearchText] = useState('');
    const [foundTasks, setFoundItem] = useState([]);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    const [time, setTime] = useState(new Date());
    const [error, setError] = useState(null);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [openCalendar, setOpenCalendar] = useState(false);

    function OpenNotification(e) {
        e.preventDefault();
        setIsNotifOpen(!isNotifOpen);
    }

    function OpenCalendar(e) {
        e.preventDefault();
        setOpenCalendar(!openCalendar);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        async function GetNotification() {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${api}/api/Notification/user-notification`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "ngrok-skip-browser-warning": "true",
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) throw new Error("Failed to fetch notifications");
                const data = await response.json();
                setNotifications(data);
            } catch (err) {
                setError(err.message);
            }
        }

        GetNotification();
    }, []);

    async function FoundTask(e) {
        e.preventDefault();
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${api}/api/ToDo/found-task`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "ngrok-skip-browser-warning": "true",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ foundTask: searchText })
            });

            if (response.status === 404) {
                setFoundItem([]);
                setIsSearchModalOpen(true);
                return;
            }

            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || response.status);
            }

            const data = await response.json();
            setFoundItem(data);
            setIsSearchModalOpen(true);
        } catch (err) {
            setError(err.message);
        }
    }

   

    const markStart = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${api}/api/ToDo/mark-task-start/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error(`Error ${response.status}`);
            setFoundItem(prev =>
                prev.map(t => t.id === id ? { ...t, isStarted: true } : t)
            );
        } catch (err) {
            setError(err.message);
        }
    };

    const markDone = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${api}/api/ToDo/mark-task-completed/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error(`Error ${response.status}`);
            setFoundItem(prev =>
                prev.map(t => t.id === id ? { ...t, isCompleted: true } : t)
            );
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${api}/api/ToDo/delete-task/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error(`Error ${response.status}`);
            setFoundItem(prev => prev.filter(t => t.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='user-dashboard-header-container'>
            <div className='user-dashboard-header-sections'>
                <div className='user-dashboard-header-logo'>
                    <h3>Dash</h3>
                    <h2>board</h2>
                </div>

                <div className='user-dashboard-header-input'>
                    <form onSubmit={FoundTask} className='user-dashboard-header-form'>
                        <div className="input-user-header">
                            <input
                                type="text"
                                value={searchText}
                                placeholder='Enter your task here...'
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <button type="submit">
                                <img src={search} alt="search" />
                            </button>
                        </div>
                    </form>
                </div>

                <div className='user-dashboard-header-info'>
                    <div className='user-dashboard-header-info-button' style={{ position: 'relative' }}>
                        <button className="btn-calendar" onClick={OpenCalendar}>
                            <img src={calendar} alt="calendar" />
                        </button>

                        <button className="btn-notification" onClick={OpenNotification}>
                            <img src={notification} alt="notifications" />
                        </button>

                        {isNotifOpen && (
                            <div className="notification-popup">
                                <ul>
                                    {notifications.length > 0
                                        ? notifications.map((item) => (
                                            <li key={item.id}>{item.header}</li>
                                        ))
                                        : <li>No new notifications</li>
                                    }
                                </ul>
                            </div>
                        )}

                        {openCalendar && (
                            <div className="calendar-popup">
                                <input type="date" />
                            </div>
                        )}
                    </div>

                    <div className='user-dashboard-header-info-dato'>
                        <div>{time.toLocaleDateString()}</div>
                        <div className='user-dashboard-header-info-time-time'>
                            {time.toLocaleTimeString()}
                        </div>
                    </div>
                </div>
            </div>

            {isSearchModalOpen && (
                <div className="search-modal-overlay" onClick={() => setIsSearchModalOpen(false)}>
                    <div className="search-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Found tasks</h3>

                        {foundTasks.length === 0 ? (
                            <p>Sorry, no tasks found.</p>
                        ) : (
                            <ul>
                                {foundTasks.map(task => (
                                    <li key={task.id}>
                                        <strong>{task.header}</strong> — {task.description}
                                        <br />
                                        Created: {new Date(task.atCreated).toLocaleString()}
                                        <br />
                                        Deadline: {new Date(task.deadline).toLocaleString()}
                                        <br />
                                        Started: {task.isStarted ? "Yes" : "No"}
                                        <br />
                                        Completed: {task.isCompleted ? "Completed" : "No"}

                                        <div className="search-task-actions">
                                            <button onClick={() => markStart(task.id)}> Start</button>
                                            <button onClick={() => markDone(task.id)}> Done</button>
                                            <button onClick={() => handleDelete(task.id)}> Delete</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <button className="close-modal" onClick={() => setIsSearchModalOpen(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserDashBoardHeader;
