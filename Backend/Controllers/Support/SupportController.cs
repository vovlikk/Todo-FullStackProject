using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoList_Fullstack.Data;
using TodoList_Fullstack.Models.Support;

namespace TodoList_Fullstack.Controllers.Support
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupportController : ControllerBase
    {
        private readonly TodoListDbContext _todoListDbContext;
        private readonly UserManager<IdentityUser> _userManager;

        public SupportController(TodoListDbContext todoListDbContext, UserManager<IdentityUser> userManager)
        {
            _todoListDbContext = todoListDbContext;
            _userManager = userManager;
        }

        [HttpPost("SendSupportSms")]
        public async Task<IActionResult> SendSupportSms([FromBody] SupportSms support)
        {
            

            var newSupport = new SupportSms
            {
                Title = support.Title,
                
            };

             _todoListDbContext.Supports.Add(newSupport);
            await _todoListDbContext.SaveChangesAsync();

            return Ok(new { message = "Support request sent successfully" });
        }
    }
}
