using System.Security.Claims;
using TodoList_Fullstack.Dto.ToDo;

namespace TodoList_Fullstack.Interface.Notification
{
    public interface INotificInterface
    {

        Task<IEnumerable<TodoDto>> UserNotification(ClaimsPrincipal currentUser);
    }
}
