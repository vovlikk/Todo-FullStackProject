using System.ComponentModel.DataAnnotations;

namespace TodoList_Fullstack.Models.Authentication
{
    public class Register
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string Username { get; set; }

        public string Password { get; set; }
    }
}
