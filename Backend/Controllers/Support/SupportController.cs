using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoList_Fullstack.Data;
using TodoList_Fullstack.Interface.Support;
using TodoList_Fullstack.Models.Support;

namespace TodoList_Fullstack.Controllers.Support
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupportController : ControllerBase
    {
        private readonly TodoListDbContext _todoListDbContext;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ISupportInterface _supportInterface;

        public SupportController(TodoListDbContext todoListDbContext, UserManager<IdentityUser> userManager, ISupportInterface supportInterface)
        {
            _todoListDbContext = todoListDbContext;
            _userManager = userManager;
            _supportInterface = supportInterface;
        }

        [HttpPost("SendSupportSms")]
        
        public async Task<IActionResult> SendSupportSms([FromBody] string sms)
        {
            var result = await _supportInterface.SendSmsToSupport(sms);
            if (result)
            {
                return Ok(new { Message = "Support SMS sent successfully." });
            }
            else
            {
                return BadRequest(new { Message = "Failed to send Support SMS." });
            }
        }
    }
}
