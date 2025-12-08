using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TodoList_Fullstack.Data;
using TodoList_Fullstack.Interface.Notification;

namespace TodoList_Fullstack.Controllers.Notification
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificInterface _notificationService;
        private readonly TodoListDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public NotificationController(INotificInterface notificationService, TodoListDbContext context, UserManager<IdentityUser> userManager)
        {
            _notificationService = notificationService;
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("user-notification")]
        public async Task<IActionResult> GetUserNotifications()
        {
            var user = User;
            var notifications = await _notificationService.UserNotification(user);
            return Ok(notifications);
        }
    }
}
