using Microsoft.AspNetCore.Identity;
using TodoList_Fullstack.Models.CategoryModel;

namespace TodoList_Fullstack.Models.ToDo
{
    public class ToDoItem
    {
        public int Id { get; set; } 

        public string UserId { get; set; } = string.Empty;

        public int CategoryId { get; set; }

        public Category Category { get; set; }
        public string Header { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
          
        public bool IsCompleted { get; set; } = false;

        public DateTime AtCreated { get; set; } = DateTime.UtcNow;

        public DateTime Deadline { get; set; }         
        public DateTime? CompletedAt { get; set; }
        public IdentityUser User { get; set; }
    }
}
