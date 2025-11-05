using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using TodoList_Fullstack.Data;

namespace TodoList_Fullstack.Service.InfoPerson
{
    public class UserService
    {
        private readonly TodoListDbContext _todoListDbContext;
        private readonly UserManager<IdentityUser> _userManager;

        public UserService(TodoListDbContext todoListDbContext, UserManager<IdentityUser> userManager)
        {
            _todoListDbContext = todoListDbContext;
            _userManager = userManager;
        }

        public async Task<bool> ChangeNumber(ClaimsPrincipal userPrincipal, string number)
        {
            if (string.IsNullOrEmpty(number) || number.Length > 10)
                return false;

            var user = await _userManager.GetUserAsync(userPrincipal);
            if (user == null) return false;

            user.PhoneNumber = number;
            var result = await _userManager.UpdateAsync(user);

            return result.Succeeded;
        }
    }
}
