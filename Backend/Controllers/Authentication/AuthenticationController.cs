using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TodoList_Fullstack.Data;
using TodoList_Fullstack.Models.Authentication;

namespace TodoList_Fullstack.Controllers.Authentication
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly TodoListDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public AuthenticationController(TodoListDbContext context, IConfiguration configuration, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _configuration = configuration;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Register model)
        {
            var emailExists = await _userManager.FindByEmailAsync(model.Email);
            if (emailExists != null)
            {
                return BadRequest(new { message = "Email already exists" });
            }
            var user = new IdentityUser
            {
                UserName = model.Username,
                Email = model.Email
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                if (!await _roleManager.RoleExistsAsync("User"))
                {
                    await _roleManager.CreateAsync(new IdentityRole("User"));
                }
                await _userManager.AddToRoleAsync(user, "User");
                return Ok(new { message = "User registered successfully" });
            }
            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login login)
        {
            var username = await _userManager.FindByNameAsync(login.UserName);
            var passwordCheck = await _userManager.CheckPasswordAsync(username, login.Password);

            if (username != null && passwordCheck)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, username.Id),
                    new Claim(ClaimTypes.Name, username.UserName)
                };

                var role = await _userManager.GetRolesAsync(username);
                foreach (var r in role)
                {
                    claims.Add(new Claim(ClaimTypes.Role, r));
                }

                var issuer = _configuration["JwtSettings:Issuer"];
                var audience = _configuration["JwtSettings:Audience"];
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]));


                var token = new JwtSecurityToken(
                    issuer: issuer,
                    audience: audience,
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
                );




               

                return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
            }
            return Unauthorized(new { message = "Invalid username or password" });
        }

        [HttpGet("getUser")]
        public async Task<IActionResult> GetUser()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }
            return Ok(new { user.UserName, user.Email });

        }
    }
}
