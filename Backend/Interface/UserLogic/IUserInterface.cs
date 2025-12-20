using System.Security.Claims;

namespace TodoList_Fullstack.Interface.UserLogic
{
    public interface IUserInterface
    {
        
        Task<bool> ChangeName(ClaimsPrincipal userPrincipal, string userName);

        Task<bool> ChangeEmail(ClaimsPrincipal userPrincipal, string email);

        Task<bool> ChangePassword(ClaimsPrincipal userPrincipal, string password);
    }
}
