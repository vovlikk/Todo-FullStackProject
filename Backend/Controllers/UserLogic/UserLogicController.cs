using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TodoList_Fullstack.Dto.UserInfo;
using TodoList_Fullstack.Interface.UserLogic;

namespace TodoList_Fullstack.Controllers.UserLogic
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLogicController : ControllerBase
    {
        private readonly IUserInterface _userInterface;
        private readonly UserManager<IdentityUser> _userManager;

        public UserLogicController(IUserInterface userInterface, UserManager<IdentityUser> userManager)
        {
            _userInterface = userInterface;
            _userManager = userManager;
        }

        

        [HttpPut("change-name")]

        public async Task<IActionResult> ChangeName([FromBody] UserChangeName userInfoDto)
        {
            var user = User;
            var result = await _userInterface.ChangeName(user, userInfoDto.userName);
            if (!result)
            {
                return BadRequest(new { Message = "Failed to change user name. Name already exist" });
            }
            return Ok(new { Message = "User name changed successfully." });
        }

        [HttpPut("change-email")]
        public async Task<IActionResult> ChangeEmail([FromBody] UserChangeEmail userChangeEmail)
        {
            var user = User;
            var result = await _userInterface.ChangeEmail(user, userChangeEmail.email);
            if (!result)
            {
                return BadRequest(new { Message = "Failed to change email. Email already exist" });
            }
            return Ok(new { Message = "Email changed successfully." });
        }

        [HttpPut("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] UserChangePassword userChangePassword)
        {
            var user = User;
            var result = await _userInterface.ChangePassword(user, userChangePassword.password);
            if (!result)
            {
                return BadRequest(new { Message = "Failed to change password." });
            }
            return Ok(new { Message = "Password changed successfully." });
        }

        
    }
}
