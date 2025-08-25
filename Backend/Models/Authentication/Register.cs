using System.ComponentModel.DataAnnotations;

namespace TodoList_Fullstack.Models.Authentication
{
    public class Register
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
