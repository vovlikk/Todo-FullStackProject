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

        [HttpPost("found-task")]
        public async Task<IActionResult> FoundTask([FromBody] FoundTaskDto foundTaskDto)
        {
            var user = User;
            var result = await _toDoInterface.FoundTask(user, foundTaskDto.FoundTask);
            if (result == null || !result.Any())
            {
                return NotFound(new { Message = "No matching tasks found." });
            }
            return Ok(result);
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
            var result = await _toDoInterface.MarkTaskAsCompleted(user, id);
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

        [HttpGet("get-all-completed-todo-items")]
        public async Task<IActionResult> GetAllCompletedToDoItems()
        {
            var user = User;
            var result = await _toDoInterface.GetAllCompletedToDoItems(user);
            return Ok(result);
        }

        [HttpPut("mark-task-start/{id}")]
        public async Task<IActionResult> MarkTaskStart([FromRoute] int id)
        {
            var user = User;
            var result = await _toDoInterface.MarkTaskStart(user, id);
            if (result)
            {
                return Ok(new { Message = "To-Do item marked as started successfully." });
            }
            else
            {
                return BadRequest(new { Message = "Failed to mark To-Do item as started." });
            }
        }

        [HttpGet("recently-created-task")]
        public async Task<IActionResult> RecentlyCreatedTask()
        {
            var user = User;
            var result = await _toDoInterface.RecentlyCreatedTask(user);
            return Ok(result);
        }

        [HttpGet("get-task-statistics")]
        public async Task<IActionResult> GetTaskStatistics()
        {
            var user = User;
            var result = await _toDoInterface.GetTaskStatistics(user);
            return Ok(result);
        }

        [HttpPatch]
        [Route("update-todo-item/{id}")]
        public async Task<IActionResult> UpdateToDoItem([FromRoute] int id, [FromBody] UpdateItemDto updateItemDto)
        {
            var user = User;
            var result = await _toDoInterface.UpdateToDoItem(user, id, updateItemDto);
            if (result)
            {
                return Ok(new { Message = "To-Do item updated successfully." });
            }
            else
            {
                return BadRequest(new { Message = "Failed to update To-Do item." });
            }
        }
    }
}
