using System.ComponentModel.DataAnnotations;

namespace TodoList_Fullstack.Models.Support
{
    public class SupportSms
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(500)]
        public string Title { get; set; } = string.Empty;

        
    }
}
