using System.ComponentModel.DataAnnotations;

namespace TodoList_Fullstack.Dto.ToDo
{
    public class TodoDto
    {
        [Required]
        [MaxLength(30)]
        public string Header { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        

        [Required]
        public DateTime Deadline { get; set; }

        [Required]
        public int CategoryId { get; set; }
    }
}
