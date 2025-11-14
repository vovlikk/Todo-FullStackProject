using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using TodoList_Fullstack.Dto.ToDo;
using TodoList_Fullstack.Models.CategoryModel;
using TodoList_Fullstack.Models.ToDo;

namespace TodoList_Fullstack.Interface.ToDo
{
    public interface IToDoInterface
    {
        Task<bool> CreateToDoItem(TodoDto todoDto, ClaimsPrincipal currentUser,int id);
        Task<bool> DeleteTask(int id);

        Task<bool> MarkTaskAsCompleted(int id);
        
        Task<IEnumerable<ToDoItem>> GetAllToDoItems();

       

    }
}
