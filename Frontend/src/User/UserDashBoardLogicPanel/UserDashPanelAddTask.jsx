import { useState } from "react";
import "../UserDashBoardLogicPanelCss/UserDashPanelAddTask.css";
import api from "../../Connect/Connect";

function AddTask() {
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [deadline, setDeadline] = useState("");

  const categories = [
    { id: 1, name: "Work" },
    { id: 2, name: "Personal" },
    { id: 3, name: "Shopping" },
    { id: 4, name: "Health" },
    { id: 5, name: "Finance" },
  ];

  async function Add(e) {
    e.preventDefault();

    
    if (!header || !description || !categoryId || !deadline) {
      alert("Заполните все поля!");
      return;
    }

    const info = {
      header,
      description,
      categoryId: Number(categoryId),
      deadline 
    };

    try {
     
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Пользователь не авторизован!");
        return;
      }

      const response = await fetch(`${api}/api/todo/create-todo-item`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(info),
      });

      if (response.ok) {
        alert("Задача успешно добавлена!");
        setHeader("");
        setDescription("");
        setCategoryId("");
        setDeadline("");
      } else {
        const text = await response.text();
        alert("Ошибка при создании задачи: " + text);
      }
    } catch (error) {
      console.error("Ошибка запроса:", error);
      alert("Сервер недоступен!");
    }
  }

  return (
    <form className="add-task-container" onSubmit={Add}>
      <div className="add-task-field add-task-header">
        <label htmlFor="header">Title</label>
        <input
          id="header"
          type="text"
          placeholder="Title"
          value={header}
          onChange={(e) => setHeader(e.target.value)}
          required
          maxLength={30}
        />
      </div>

      <div className="add-task-field add-task-description">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          maxLength={500}
        />
      </div>

      <div className="add-task-field add-task-deadline">
        <label htmlFor="deadline">Deadline</label>
        <input
          id="deadline"
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>

      <div className="add-task-field add-task-category">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id.toString()}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="add-task-actions">
        <button type="submit" className="add-task-button">
          Add Task
        </button>
      </div>
    </form>
  );
}

export default AddTask;
