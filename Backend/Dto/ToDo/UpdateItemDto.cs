using System.ComponentModel.DataAnnotations;

namespace TodoList_Fullstack.Dto.ToDo
{
    public class UpdateItemDto
    {
        
        [MaxLength(30)]
        public string? Header { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }
        public DateTime? Deadline { get; set; }

        public bool? IsCompleted { get; set; }
        public bool? IsStarted { get; set; }


    }
}
