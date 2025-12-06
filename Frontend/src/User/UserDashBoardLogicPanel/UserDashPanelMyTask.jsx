import { useEffect, useState } from "react";
import "../UserDashBoardLogicPanelCss/UserDashPanelMyTask.css";
import api from "../../Connect/Connect";

function UserDashMyTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 12; 

 
  
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
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
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
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id ? { ...task, isCompleted: true } : task
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const markStart = async (id) =>{
    try{
      const token = localStorage.getItem('token');
      const response = await fetch(`${api}/api/ToDo/mark-task-start/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
        },
      });
      if(!response.ok) throw new Error(`Error ${response.status}`);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, isStarted: true } : task
        )
      );
    }
    catch(err){
      setError(err.message)
    }
  };

  
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${api}/api/ToDO/get-all-user-todo-items`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error(`Error ${response.status}`);

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

  
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

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
              <ul>
                {currentTasks.length === 0 && <p>No tasks found.</p>}

                {currentTasks.map((item) => (
                  <li key={item.id}>
                    <strong>{item.header}</strong> — {item.description}  
                    <br />
                    Created: {new Date(item.atCreated).toLocaleString()}
                    <br />
                    Deadline: {new Date(item.deadline).toLocaleString()}
                    <br />
                    Started: {item.isStarted? "Yes" : "No"}
                    <br />
                    Completed: {item.isCompleted ? "Completed" : "No"}

                    <div className="my-tasks-buttons">
                      <button onClick={() => markStart(item.id)}>Start</button>
                      <button onClick={() => markDone(item.id)}>Done</button>
                      <button>Change</button>
                      <button onClick={() => handleDelete(item.id)}>Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          
          {tasks.length > tasksPerPage && (
            <div className="pagination">
              <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
              <span>Page {currentPage} / {totalPages}</span>
              <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashMyTask;
