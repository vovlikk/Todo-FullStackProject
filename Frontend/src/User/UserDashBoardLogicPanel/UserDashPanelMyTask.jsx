import { useEffect, useState } from 'react';
import '../UserDashBoardLogicPanelCss/UserDashPanelMyTask.css';
import api from "../../Connect/Connect";

function UserDashMyTask() {
    const [tasks, setTasks] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${api}/api/ToDO/all-task`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setTasks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div className="my-task-container">
            <div className="my-task-sections">
                <div className="my-tasks">
                    <div className="my-tasks-header-name">
                        <h3>My Tasks</h3>
                    </div>

                    <div className="my-tasks-header">
                        {loading && <p>Loading tasks...</p>}
                        {error && <p className="error-text">Error: {error}</p>}
                        {!loading && !error && (
                            tasks.length > 0 ? (
                                <ul>
                                   {tasks.map((item) => (
                                        <li key={item.id}>{item.header}</li>
                                            ))}
                                </ul>
                            ) : (
                                <p>No tasks yet.</p>
                            )
                        )}
                    </div>
                </div>

                <div className="my-task-info">
                    <h2></h2>
                </div>
            </div>
        </div>
    );
}

export default UserDashMyTask;
