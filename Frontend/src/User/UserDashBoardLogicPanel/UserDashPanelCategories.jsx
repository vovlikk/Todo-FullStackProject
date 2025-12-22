import { useState, useEffect } from 'react';
import '../UserDashBoardLogicPanelCss/UserDashPanelCategories.css';
import api from '../../Connect/Connect';

function Categories() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const categoriesPerPage = 25; 

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${api}/api/category/get-user-category`, {
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
            const response = await fetch(`${api}/api/category/add-new-category`, {
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

    async function DeleteCategory(categoryId) {
        if (!categoryId) return;

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${api}/api/category/user-delete-category/${categoryId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                fetchCategories();
            } else {
                const text = await response.text();
                alert("Ошибка при удалении категории: " + text);
            }
        } catch (err) {
            console.error("Ошибка запроса:", err);
            alert("Сервер недоступен!");
        }
    }

   
    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

    const totalPages = Math.ceil(categories.length / categoriesPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <p>Загрузка категорий...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='categories-container'>
            <h2>Categories</h2>

            <div className="add-category">
                <input
                    type="text"
                    placeholder="New Category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <button type="button" onClick={AddCategory}>Add</button>
            </div>

            {categories.length === 0 ? (
                <p>Категории не найдены</p>
            ) : (
                <>
                    <ul className="category-list">
                        {currentCategories.map(cat => (
                            <li key={cat.id} className="category-item">
                                <span>{cat.categoryName}</span>
                                {cat.userId && (
                                    <button
                                        className="delete-btn"
                                        onClick={() => DeleteCategory(cat.id)}
                                        title="Удалить категорию"
                                    >
                                        <span className="delete-icon">✕</span>
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>

                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginate(i + 1)}
                                className={currentPage === i + 1 ? "active" : ""}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Categories;
