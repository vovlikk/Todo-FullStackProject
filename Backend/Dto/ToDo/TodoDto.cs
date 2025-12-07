using System.ComponentModel.DataAnnotations;

namespace TodoList_Fullstack.Dto.ToDo
{
    public class TodoDto
    {
        
        public int Id { get; set; }

        [Required]
        [MaxLength(30)]
        public string Header { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        public DateTime AtCreated { get; set; } = DateTime.UtcNow;

        public bool IsCompleted { get; set; } = false;

        public DateTime? CompletedAt { get; set; }


        [Required]
        public DateTime Deadline { get; set; }

        [Required]
        public int CategoryId { get; set; }

        public int UserId { get; set; } 
    }
}
