using Microsoft.AspNetCore.Identity;

namespace TodoList_Fullstack.Models.CategoryModel
{
    public class Category
    {
        public int Id { get; set; }
        public string CategoryName { get; set;} = string.Empty;

        public string? UserId { get; set; } 

        public IdentityUser? User { get; set; }
    }
}
