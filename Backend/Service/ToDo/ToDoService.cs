using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TodoList_Fullstack.Data;
using TodoList_Fullstack.Dto.ToDo;
using TodoList_Fullstack.Interface.ToDo;
using TodoList_Fullstack.Models.CategoryModel;
using TodoList_Fullstack.Models.ToDo;

namespace TodoList_Fullstack.Service.ToDo
{
    public class ToDoService : IToDoInterface
    {
        private readonly TodoListDbContext _todoListDbContext;
        private readonly UserManager<IdentityUser> _userManager;

        public ToDoService(TodoListDbContext todoListDbContext, UserManager<IdentityUser> userManager)
        {
            _todoListDbContext = todoListDbContext;
            _userManager = userManager;
        }

        public async Task<bool> CreateToDoItem(TodoDto todoDto, ClaimsPrincipal currentUser, int categoryId)
        {
            var user = await _userManager.GetUserAsync(currentUser);
            if (user == null)
                return false;

            if (categoryId <= 0)
                return false;

            if (todoDto.Header.Length > 30 || todoDto.Description.Length > 500)
                return false;

            var item = new ToDoItem
            {
                Header = todoDto.Header,
                Description = todoDto.Description,
                IsCompleted = false,
                AtCreated = DateTime.UtcNow,
                Deadline = todoDto.Deadline,
                UserId = user.Id,
                CategoryId = categoryId
            };

            _todoListDbContext.ToDoItems.Add(item);
            await _todoListDbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteTask(ClaimsPrincipal currentUser, int id)
        {
            var user = await _userManager.GetUserAsync(currentUser);

            var findToDoItem = await _todoListDbContext.ToDoItems
                .Where(t => t.UserId == user.Id)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (findToDoItem == null)
                return false;

            _todoListDbContext.ToDoItems.Remove(findToDoItem);
            await _todoListDbContext.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<TodoDto>> FoundTask(ClaimsPrincipal currentUser, string nameOfTask)
        {
            var user = await _userManager.GetUserAsync(currentUser);

            var foundTask = await _todoListDbContext.ToDoItems
                .FirstOrDefaultAsync(t => t.UserId == user.Id && t.Header == nameOfTask);

            if (foundTask == null)
                return Enumerable.Empty<TodoDto>();

            return new List<TodoDto>
            {
                new TodoDto
                {
                    Id = foundTask.Id,
                    Header = foundTask.Header,
                    Description = foundTask.Description,
                    IsCompleted = foundTask.IsCompleted,
                    AtCreated = foundTask.AtCreated,
                    Deadline = foundTask.Deadline,
                    CategoryId = foundTask.CategoryId
                }
            };
        }

        public async Task<IEnumerable<TodoDto>> GetAllCompletedToDoItems(ClaimsPrincipal currentUser)
        {
            var user = await _userManager.GetUserAsync(currentUser);
            var weekAgo = DateTime.UtcNow.AddDays(-7);

            var todoItems = await _todoListDbContext.ToDoItems
                .Where(t => t.UserId == user.Id && t.IsCompleted && t.CompletedAt >= weekAgo)
                .Select(t => new TodoDto
                {
                    Id = t.Id,
                    Header = t.Header,
                    Description = t.Description,
                    IsCompleted = t.IsCompleted,
                    AtCreated = t.AtCreated,
                    Deadline = t.Deadline,
                    CategoryId = t.CategoryId,
                    CompletedAt = t.CompletedAt
                })
                .ToListAsync();

            return todoItems;
        }

        public async Task<IEnumerable<TodoDto>> GetAllUserToDoItems(ClaimsPrincipal currentUser)
        {
            var user = await _userManager.GetUserAsync(currentUser);

            var todoItems = await _todoListDbContext.ToDoItems
                .Where(t => t.UserId == user.Id)
                .Select(t => new TodoDto
                {
                    Id = t.Id,
                    Header = t.Header,
                    Description = t.Description,
                    IsCompleted = t.IsCompleted,
                    AtCreated = t.AtCreated,
                    Deadline = t.Deadline,
                    CategoryId = t.CategoryId,
                    IsStarted = t.IsStarted
                })
                .ToListAsync();

            return todoItems;
        }

        public async Task<object> GetTaskStatistics(ClaimsPrincipal currentUser)
        {
            var user = await _userManager.GetUserAsync(currentUser);

            var todoItems = await _todoListDbContext.ToDoItems
                .Where(t => t.UserId == user.Id)
                .ToListAsync();

            return new
            {
                CompletedTasks = todoItems.Count(t => t.IsCompleted),
                InProgressTasks = todoItems.Count(t => t.IsStarted && !t.IsCompleted),
                PendingTasks = todoItems.Count(t => !t.IsStarted && !t.IsCompleted)
            };
        }

        public async Task<bool> MarkTaskAsCompleted(ClaimsPrincipal currentUser, int id)
        {
            var user = await _userManager.GetUserAsync(currentUser);

            var findToDoItem = await _todoListDbContext.ToDoItems
                .Where(t => t.UserId == user.Id)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (findToDoItem == null)
                return false;

            findToDoItem.IsCompleted = true;
            findToDoItem.CompletedAt = DateTime.UtcNow;

            await _todoListDbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> MarkTaskStart(ClaimsPrincipal currentUser, int id)
        {
            var user = await _userManager.GetUserAsync(currentUser);

            var foundTask = await _todoListDbContext.ToDoItems
                .Where(t => t.UserId == user.Id)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (foundTask == null)
                return false;

            foundTask.IsStarted = true;
            await _todoListDbContext.SaveChangesAsync();
            return true;
        }

        public async Task<List<TodoDto>> RecentlyCreatedTask(ClaimsPrincipal currentUser)
        {
            var user = await _userManager.GetUserAsync(currentUser);
            var weekAgo = DateTime.UtcNow.AddDays(-7);

            var recentTasks = await _todoListDbContext.ToDoItems
                .Where(t => t.UserId == user.Id && t.AtCreated >= weekAgo)
                .Select(t => new TodoDto
                {
                    Id = t.Id,
                    Header = t.Header,
                    Description = t.Description,
                    AtCreated = t.AtCreated,
                    Deadline = t.Deadline,
                    CategoryId = t.CategoryId,
                    IsCompleted = t.IsCompleted,
                    CompletedAt = t.CompletedAt
                })
                .ToListAsync();

            return recentTasks;
        }

        public async Task<bool> UpdateToDoItem(ClaimsPrincipal currentUser, int id, UpdateItemDto updateItemDto)
        {
            var user = await _userManager.GetUserAsync(currentUser);

            var findToDoItem = await _todoListDbContext.ToDoItems
                .Where(t => t.UserId == user.Id)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (findToDoItem == null)
            {
                return false;
            }

            if(updateItemDto.Header != null)
            {
                findToDoItem.Header = updateItemDto.Header;
            }
            if(updateItemDto.Description != null)
            {
                findToDoItem.Description = updateItemDto.Description;
            }

            if(updateItemDto.Deadline != null)
            {
                findToDoItem.Deadline = updateItemDto.Deadline.Value;
            }

            if(updateItemDto.IsCompleted != null)
            {
                findToDoItem.IsCompleted = updateItemDto.IsCompleted.Value;
                if (updateItemDto.IsCompleted.Value)
                {
                    findToDoItem.CompletedAt = DateTime.UtcNow;
                }
                else
                {
                    findToDoItem.CompletedAt = null;
                }
            }
            if(updateItemDto.IsStarted != null)
            {
                findToDoItem.IsStarted = updateItemDto.IsStarted.Value;
            }

            await _todoListDbContext.SaveChangesAsync();
            return true;


        }
    }
}
