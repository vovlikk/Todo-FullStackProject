using TodoList_Fullstack.Dto.ToDo;
using TodoList_Fullstack.Models.ToDo;

namespace TodoList_Fullstack.Interface.ToDo
{
    public interface IToDoInterface
    {
        Task<bool> CreateToDoItem(TodoDto todoDto);
        Task<bool> DeleteTask(int id);

        Task<bool> MarkTaskAsCompleted(int id);
        Task<IEnumerable<string>> Category(); 

        Task<IEnumerable<ToDoItem>> GetAllToDoItems();
    }
}
