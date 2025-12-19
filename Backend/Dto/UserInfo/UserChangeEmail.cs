using System.ComponentModel.DataAnnotations;

namespace TodoList_Fullstack.Dto.UserInfo
{
    public class UserChangeEmail
    {
        [EmailAddress]
        public string email { get; set; }
    }
}
