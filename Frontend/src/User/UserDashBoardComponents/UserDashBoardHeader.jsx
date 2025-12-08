import '../../User/UserDashBoardComponentsCss/UserDashBoardHeader.css';
import { useState, useEffect } from 'react';
import search from '../../User/UserDashBoardImg/Search.png';
import calendar from '../../User/UserDashBoardImg/calendar.png';
import notification from '../../User/UserDashBoardImg/notification.png';
import api from '../../Connect/Connect'

function UserDashBoardHeader() {
    const [founditem, setFoundItem] = useState('');
    const [time, setTime] = useState(new Date());
    const [error, setError] = useState(null);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [openCalendar,setOpenCalendar] = useState(false);

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

                if (!response.ok) {
                    throw new Error("Failed to fetch notifications");
                }

                const data = await response.json();
                setNotifications(data); 
            } catch (err) {
                setError(err.message);
            }
        }

        GetNotification();
    }, []);
    
    useEffect(() => {
        function handleClickOutside(event) {
            const popup = document.querySelector('.notification-popup');
            if (popup && !popup.contains(event.target)) {
                setIsNotifOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
    function handleClickOutsideCalendar(event) {
        const calendarPopup = document.querySelector('.calendar-popup');
        if (calendarPopup && !calendarPopup.contains(event.target)) {
            setOpenCalendar(false);
        }
    }

    document.addEventListener('mousedown', handleClickOutsideCalendar);
    return () => document.removeEventListener('mousedown', handleClickOutsideCalendar);
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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ text: founditem })
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || response.status);
            }

            const data = await response.json();
            console.log("Found tasks:", data);
        } catch (err) {
            setError(err.message);
        }
    }

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
                                value={founditem}
                                placeholder='Enter your task here...'
                                onChange={(e) => setFoundItem(e.target.value)}
                            />
                            <button type="submit">
                                <img src={search} alt="search" />
                            </button>
                        </div>
                    </form>
                </div>

                <div className='user-dashboard-header-info'>

                    <div className='user-dashboard-header-info-button' style={{ position: 'relative' }}>
                        <button 
                                className="btn-calendar" 
                                onClick={OpenCalendar}
                            >
                                <img src={calendar} alt="calendar" />
                            </button>

                            <button 
                                className="btn-notification" 
                                onClick={OpenNotification}
                            >
                                <img src={notification} alt="notifications" />
                            </button>

                        {isNotifOpen && (
                            <div className="notification-popup">
                                
                                <ul>
                                    {notifications.length > 0 ? (
                                        notifications.map((item) => (
                                            <li key={item.id}>{item.header}</li>
                                        ))
                                    ) : (
                                        <li>No new notifications</li>
                                    )}
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
                        <div>
                            {time.toLocaleDateString()}
                        </div>
                        <div className='user-dashboard-header-info-time-time'>
                            {time.toLocaleTimeString()}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default UserDashBoardHeader;
