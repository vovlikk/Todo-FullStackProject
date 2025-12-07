import { useEffect, useState } from "react";
import "../UserDashBoardLogicPanelCss/UserDashPanelAddTask.css";
import api from "../../Connect/Connect";

function AddTask() {
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userCategory, setUserCategory] = useState([]);

  // Получение категорий пользователя
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token"); // было localStorage('token') - ошибка
        if (!token) throw new Error("Пользователь не авторизован!");

        const response = await fetch(`${api}/api/Category/get-user-category`, {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            "Authorization": `Bearer ${token}`, // было "Authrorize" - ошибка
          },
        });

        if (!response.ok) {
          throw new Error(`Ошибка ${response.status}`);
        }

        const data = await response.json();
        setUserCategory(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Добавление новой задачи
  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!header || !description || !categoryId || !deadline) {
      alert("Заполните все поля!");
      return;
    }

    const info = {
      header,
      description,
      categoryId: Number(categoryId),
      deadline,
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
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
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
  };

  return (
    <form className="add-task-container" onSubmit={handleAddTask}>
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
          {userCategory.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>

      <div className="add-task-actions">
        <button type="submit" className="add-task-button">
          Add Task
        </button>
      </div>

      {loading && <p>Loading categories...</p>}
      {error && <p className="error-text">{error}</p>}
    </form>
  );
}

export default AddTask;
