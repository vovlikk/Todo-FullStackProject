using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TodoList_Fullstack.Data;
using TodoList_Fullstack.Dto.ToDo;
using TodoList_Fullstack.Interface.Notification;

namespace TodoList_Fullstack.Service.Notification
{
    public class NotificationService : INotificInterface
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly TodoListDbContext _context;

        public NotificationService(UserManager<IdentityUser> userManager, TodoListDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }
        public async Task<IEnumerable<TodoDto>> UserNotification(ClaimsPrincipal currentUser)
        {
           var now = DateTime.UtcNow;
           var user = await _userManager.GetUserAsync(currentUser);
           var targetTime = now.AddMinutes(30);

           var not = await _context.ToDoItems.Where(x => x.UserId == user.Id).Where(n => n.Deadline >= now && n.Deadline <= targetTime).ToListAsync();


            var todoDtos = not.Select(t => new TodoDto
            {
                Id = t.Id,
                Header = t.Header,
                Description = t.Description,
                AtCreated = t.AtCreated,
                IsCompleted = t.IsCompleted,
                Deadline = t.Deadline,
            });

            return todoDtos;

        }
    }
}
