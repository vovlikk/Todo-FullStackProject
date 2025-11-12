using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TodoList_Fullstack.Dto.CategoryDto;
using TodoList_Fullstack.Dto.ToDo;
using TodoList_Fullstack.Interface.ToDo;

namespace TodoList_Fullstack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly IToDoInterface _toDoInterface;

        public ToDoController(IToDoInterface toDoInterface)
        {
            _toDoInterface = toDoInterface;
        }

        [HttpPost("create-todo-item")]
        public async Task<IActionResult> CreateToDoItem([FromBody] TodoDto todoDto)
        {

            var user = User;
            var result = await _toDoInterface.CreateToDoItem(todoDto, user, todoDto.CategoryId);
            if (result)
                return Ok(new { Message = "To-Do item created successfully." });
            return BadRequest(new { Message = "Failed to create To-Do item." });
        }

        [HttpDelete("delete-task")]
        public async Task<IActionResult> DeleteTask([FromRoute] int id)
        {
            var result = await _toDoInterface.DeleteTask(id);
            if (result)
            {
                return Ok(new { Message = "To-Do item deleted successfully." });
            }
            else
            {
                return BadRequest(new { Message = "Failed to delete To-Do item." });
            }
        }

        [HttpPut("mark-task-completed")]
        public async Task<IActionResult> MarkTaskAsCompleted([FromRoute] int id)
        {
            var result = await _toDoInterface.MarkTaskAsCompleted(id);
            if (result)
            {
                return Ok(new { Message = "To-Do item marked as completed successfully." });
            }
            else
            {
                return BadRequest(new { Message = "Failed to mark To-Do item as completed." });
            }
        }

        [HttpGet("all-task")]
        public async Task<IActionResult> GetAllToDoItems()
        {
            var items = await _toDoInterface.GetAllToDoItems();
            return Ok(items);
        }

        [HttpPost("add-category")]
        public async Task<IActionResult> AddNewCategory([FromBody] CategoryDto categoryDto)
        {
            var result = await _toDoInterface.AddNewCategory(categoryDto.CategoryName);
            if (result)
            {
                return Ok(new { Message = "Category added successfully." });
            }
            else
            {
                return BadRequest(new { Message = "Failed to add category." });
            }
        }

        [HttpGet("all-categories")]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _toDoInterface.Category();
            return Ok(categories);
        }
    }
}
