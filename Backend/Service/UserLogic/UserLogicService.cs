using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TodoList_Fullstack.Data;
using TodoList_Fullstack.Interface.UserLogic;

namespace TodoList_Fullstack.Service.InfoPerson
{
    public class UserLogicService : IUserInterface
    {
        private readonly TodoListDbContext _todoListDbContext;
        private readonly UserManager<IdentityUser> _userManager;

        public UserLogicService(TodoListDbContext todoListDbContext, UserManager<IdentityUser> userManager)
        {
            _todoListDbContext = todoListDbContext;
            _userManager = userManager;
        }

        public async Task<bool> ChangeEmail(ClaimsPrincipal userPrincipal, string email)
        {
            var user = await _userManager.GetUserAsync(userPrincipal);

            if (user == null)
                return false;

            var userWithSameEmail = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == email && u.Id != user.Id);
            if (userWithSameEmail != null)
                return false;

            user.Email = email;

            var result = await _userManager.UpdateAsync(user);
            return result.Succeeded;
        }

        public async Task<bool> ChangeName(ClaimsPrincipal userPrincipal, string userName)
        {
            if (string.IsNullOrWhiteSpace(userName))
                return false;

            var user = await _userManager.GetUserAsync(userPrincipal);
            if (user == null)
                return false;

            var userWithSameName = await _userManager.Users
                .FirstOrDefaultAsync(u => u.UserName == userName && u.Id != user.Id);

            if (userWithSameName != null)
                return false;

            user.UserName = userName;

            var result = await _userManager.UpdateAsync(user);
            return result.Succeeded;
        }

        public async Task<bool> ChangePassword(ClaimsPrincipal userPrincipal, string password)
        {
            var user = await _userManager.GetUserAsync(userPrincipal);

            if (user == null)
                return false;

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var result = await _userManager.ResetPasswordAsync(user, token, password);

            return result.Succeeded;
        }
    }
}
