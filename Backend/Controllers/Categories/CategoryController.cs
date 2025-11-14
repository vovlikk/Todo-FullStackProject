using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoList_Fullstack.Data;
using TodoList_Fullstack.Dto.CategoryDto;
using TodoList_Fullstack.Interface.Category;

namespace TodoList_Fullstack.Controllers.Categories
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryInterface _categoryInterface;
        private readonly TodoListDbContext _todoListDbContext;

        public CategoryController(ICategoryInterface categoryInterface, TodoListDbContext todoListDbContext)
        {
            _categoryInterface = categoryInterface;
            _todoListDbContext = todoListDbContext;
        }

        [HttpPost("add-new-category")]
        public async Task<IActionResult> AddNewCategory(AddCategoryDto categoryDto)
        {
            var user = User;
            var result = await _categoryInterface.AddNewCategory(user, categoryDto);
            if (result)
                return Ok(new { Message = "Category added successfully." });
            return BadRequest(new { Message = "Failed to add category." });
        }

        [HttpGet("get-user-category")]
        public async Task<IActionResult> GetUserCategory()
        {
            var categories = await _categoryInterface.GetUserCategory(User);
            return Ok(categories);
        }

        [HttpDelete("user-delete-category/{categoryId}")]
        public async Task<IActionResult> DeleteCategory(int categoryId)
        {
            var result = await _categoryInterface.DeleteCategory(User, categoryId);
            if (result)
                return Ok(new { Message = "Category deleted successfully." });
            return BadRequest(new { Message = "Failed to delete category." });
        }
    }
}
