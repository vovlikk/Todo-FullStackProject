using Microsoft.AspNetCore.Identity;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using TodoList_Fullstack.Dto.ToDo;
using TodoList_Fullstack.Models.CategoryModel;
using TodoList_Fullstack.Models.ToDo;

namespace TodoList_Fullstack.Interface.ToDo
{
    public interface IToDoInterface
    {
        Task<bool> CreateToDoItem(TodoDto todoDto, ClaimsPrincipal currentUser,int id);
        Task<bool> DeleteTask(ClaimsPrincipal currentUser, int id);

        Task<bool> MarkTaskAsCompleted(ClaimsPrincipal currentUser, int id);

        Task<IEnumerable<TodoDto>> GetAllUserToDoItems(ClaimsPrincipal currentUser);

        Task<IEnumerable<TodoDto>> GetAllCompletedToDoItems(ClaimsPrincipal currentUser);

        Task<bool> FoundTask(ClaimsPrincipal currentUser, string taskName);

        Task<bool> MarkTaskStart(ClaimsPrincipal currentUser, int id);

        Task<List<TodoDto>> RecentlyCreatedTask(ClaimsPrincipal currentUser);




    }
}
