using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TodoList_Fullstack.Dto.CategoryDto;
using TodoList_Fullstack.Dto.ToDo;
using TodoList_Fullstack.Interface.ToDo;

namespace TodoList_Fullstack.Controllers.Todo
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

        [HttpDelete("delete-task/{id}")]
        public async Task<IActionResult> DeleteTask([FromRoute] int id)
        {
            var user = User;
            var result = await _toDoInterface.DeleteTask(user, id);
            if (result)
            {
                return Ok(new { Message = "To-Do item deleted successfully." });
            }
            else
            {
                return BadRequest(new { Message = "Failed to delete To-Do item." });
            }
        }

        [HttpPut("mark-task-completed/{id}")]
        public async Task<IActionResult> MarkTaskAsCompleted([FromRoute] int id)
        {
            var user = User;
            var result = await _toDoInterface.MarkTaskAsCompleted(user,id);
            if (result)
            {
                return Ok(new { Message = "To-Do item marked as completed successfully." });
            }
            else
            {
                return BadRequest(new { Message = "Failed to mark To-Do item as completed." });
            }
        }

        [HttpGet("get-all-user-todo-items")]
        public async Task<IActionResult> GetAllUserToDoItems()
        {
            var user = User;
            var result = await _toDoInterface.GetAllUserToDoItems(user);
            return Ok(result);
        }
    }
}
