import { useState, useEffect } from 'react';
import '../UserDashBoardLogicPanelCss/UserDashPanelCategories.css';
import api from '../../Connect/Connect';

function Categories() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState(""); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${api}/api/todo/all-categories`, {
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCategories(data); 
            } else {
                setError("Ошибка при получении категорий");
            }
        } catch (err) {
            console.error(err);
            setError("Ошибка запроса категорий");
        } finally {
            setLoading(false);
        }
    }

    async function AddCategory() {
    if (!newCategory) return alert("Введите название категории!");

    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${api}/api/todo/add-category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ CategoryName: newCategory }),
        });

        if (response.ok) {
            fetchCategories(); 
            setNewCategory("");
        } else {
            const text = await response.text();
            alert("Ошибка при добавлении категории: " + text);
        }
    } catch (err) {
        console.error("Ошибка запроса:", err);
        alert("Сервер недоступен!");
    }
}

    if (loading) return <p>Загрузка категорий...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='categories-container'>
            <h2>Категории</h2>

            <div className="add-category">
                <input
                    type="text"
                    placeholder="Новая категория"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <button type="button" onClick={AddCategory}>Добавить</button>
            </div>

            {categories.length === 0 ? (
                <p>Категории не найдены</p>
            ) : (
                <ul>
                    {categories.map(cat => (
                        <li key={cat.id}>{cat.categoryName}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Categories;
