using System.ComponentModel.DataAnnotations;

namespace TodoList_Fullstack.Dto.CategoryDto
{
    public class AddCategoryDto
    {
        [Required]
        public string CategoryName { get; set; } = string.Empty;
    }
}
