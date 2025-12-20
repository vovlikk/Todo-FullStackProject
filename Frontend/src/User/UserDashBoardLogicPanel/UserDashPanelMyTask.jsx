import { useEffect, useState } from "react";
import "../UserDashBoardLogicPanelCss/UserDashPanelMyTask.css";
import api from "../../Connect/Connect";
import { useSearchParams } from "react-router-dom";

function UserDashMyTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 12;
  const [searchParams] = useSearchParams();
  const taskIdFromQuery = searchParams.get("taskId");

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editHeader, setEditHeader] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDeadline, setEditDeadline] = useState("");
  const [editIsStarted, setEditIsStarted] = useState(false);
  const [editIsCompleted, setEditIsCompleted] = useState(false);

  
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${api}/api/ToDO/get-all-user-todo-items`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (!taskIdFromQuery || tasks.length === 0) return;

  const index = tasks.findIndex(t => String(t.id) === taskIdFromQuery);
  if (index === -1) return;

  const page = Math.floor(index / tasksPerPage) + 1;
  setCurrentPage(page);
}, [taskIdFromQuery, tasks]);

  useEffect(() => {
    fetchTasks();
  }, []);

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
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

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
      setTasks((prev) => prev.map((t) => t.id === id ? { ...t, isStarted: true } : t));
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
      setTasks((prev) => prev.map((t) => t.id === id ? { ...t, isCompleted: true } : t));
    } catch (err) {
      setError(err.message);
    }
  };

  const updateTask = async (id, updatedFields) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${api}/api/ToDo/update-todo-item/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedFields),
    });
    if (!response.ok) throw new Error(`Update failed: ${response.status}`);
  };

  
  const startEdit = (task) => {
    setEditingTaskId(task.id);
    setEditHeader(task.header ?? "");
    setEditDescription(task.description ?? "");
    setEditDeadline(task.deadline ? task.deadline.slice(0,16) : "");
    setEditIsStarted(task.isStarted);
    setEditIsCompleted(task.isCompleted);
  };

  const saveEdit = async (task) => {
    const updatedFields = {};
    if (editHeader !== task.header) updatedFields.header = editHeader;
    if (editDescription !== task.description) updatedFields.description = editDescription;
    const oldDeadline = task.deadline ? task.deadline.slice(0,16) : "";
    if (editDeadline !== oldDeadline) updatedFields.deadline = editDeadline ? new Date(editDeadline).toISOString() : null;
    if (editIsStarted !== task.isStarted) updatedFields.isStarted = editIsStarted;
    if (editIsCompleted !== task.isCompleted) updatedFields.isCompleted = editIsCompleted;

    if (Object.keys(updatedFields).length === 0) {
      setEditingTaskId(null);
      return;
    }

    try {
      await updateTask(task.id, updatedFields);
      setTasks((prev) => prev.map((t) => t.id === task.id ? { ...t, ...updatedFields } : t));
      setEditingTaskId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

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
                    Started: {item.isStarted ? "Yes" : "No"}
                    <br />
                    Completed: {item.isCompleted ? "Completed" : "No"}

                    <div className="my-tasks-buttons">
                      <button onClick={() => markStart(item.id)}>Start</button>
                      <button onClick={() => markDone(item.id)}>Done</button>
                      <button onClick={() => startEdit(item)}>Change</button>
                      <button onClick={() => handleDelete(item.id)}>Remove</button>
                    </div>

                    {editingTaskId === item.id && (
                      <div className="edit-form">
                        <input type="text" value={editHeader} onChange={e => setEditHeader(e.target.value)} placeholder="Header" />
                        <textarea value={editDescription} onChange={e => setEditDescription(e.target.value)} placeholder="Description" />
                        <input type="datetime-local" value={editDeadline} onChange={e => setEditDeadline(e.target.value)} />
                        <label>
                          <input type="checkbox" checked={editIsStarted} onChange={e => setEditIsStarted(e.target.checked)} /> Started
                        </label>
                        <label>
                          <input type="checkbox" checked={editIsCompleted} onChange={e => setEditIsCompleted(e.target.checked)} /> Completed
                        </label>
                        <div className="my-tasks-buttons">
                          <button onClick={() => saveEdit(item)}>Save</button>
                          <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {tasks.length > tasksPerPage && (
            <div className="pagination">
              <button onClick={() => setCurrentPage(p => p-1)} disabled={currentPage === 1}>Previous</button>
              <span>Page {currentPage} / {totalPages}</span>
              <button onClick={() => setCurrentPage(p => p+1)} disabled={currentPage === totalPages}>Next</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashMyTask;
