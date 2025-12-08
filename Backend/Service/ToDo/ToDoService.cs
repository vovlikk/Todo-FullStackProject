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

        public async Task<bool> CreateToDoItem(TodoDto todoDto, ClaimsPrincipal currentUser, int categoryid)
        {
            

            var user = await _userManager.GetUserAsync(currentUser);
            if (user == null)
            {
                Console.WriteLine("User is null");
                return false;
            }

            if (categoryid <= 0)
            {
                Console.WriteLine("CategoryId invalid");
                return false;
            }

            if (todoDto.Header.Length > 30 || todoDto.Description.Length > 500)
            {
                Console.WriteLine("Header or Description too long");
                return false;
            }

            var item = new ToDoItem
            {
                Header = todoDto.Header,
                Description = todoDto.Description,
                IsCompleted = false,
                AtCreated = DateTime.UtcNow,
                Deadline = todoDto.Deadline,
                UserId = user.Id,
                CategoryId = categoryid
            };

            _todoListDbContext.ToDoItems.Add(item);
            await _todoListDbContext.SaveChangesAsync();
            return true;
        }


        public async Task<bool> DeleteTask(ClaimsPrincipal currentUser, int id)
        {

            var user = await _userManager.GetUserAsync(currentUser);
            var findToDoItem = await _todoListDbContext.ToDoItems.Where(u => u.UserId == user.Id).FirstOrDefaultAsync(x => x.Id == id);
            
            if(findToDoItem == null)
            {
                return false;
            }
            _todoListDbContext.ToDoItems.Remove(findToDoItem);
            await _todoListDbContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> FoundTask(ClaimsPrincipal currendUser, string nameoftask)
        {
            var user = await _userManager.GetUserAsync(currendUser);

            var foundtask = await _todoListDbContext.ToDoItems.Where(u => u.UserId == user.Id).FirstOrDefaultAsync(t => t.Header == nameoftask);

            if(foundtask == null)
            {
                return false;
            }

            return true;
        }

        public async  Task<IEnumerable<TodoDto>> GetAllCompletedToDoItems(ClaimsPrincipal currentUser)
        {
            var user = await _userManager.GetUserAsync(currentUser);
            var bim = true;

            var todoitem =await _todoListDbContext.ToDoItems.Where(t => t.UserId == user.Id && t.IsCompleted == bim)
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

                }).ToListAsync();

            return todoitem;
        }

        public async Task<IEnumerable<TodoDto>> GetAllUserToDoItems(ClaimsPrincipal currentUser)
        {
            var user = await _userManager.GetUserAsync(currentUser);

            var todoItems = await _todoListDbContext.ToDoItems
                .Where(t => t.UserId == user.Id).Select(t => new TodoDto
                {
                    Id = t.Id,
                    Header = t.Header,
                    Description = t.Description,
                    IsCompleted = t.IsCompleted,
                    AtCreated = t.AtCreated,
                    Deadline = t.Deadline,
                    CategoryId = t.CategoryId
                })
                .ToListAsync();

            return todoItems;
        }

        

        public async Task<bool> MarkTaskAsCompleted(ClaimsPrincipal currentUser, int id)
        {
            var user = await _userManager.GetUserAsync(currentUser);
            var findToDoItem = await _todoListDbContext.ToDoItems.Where(x => x.UserId == user.Id).FirstOrDefaultAsync(t => t.Id == id);
            if (findToDoItem == null)
            {
                return false;
            }

            findToDoItem.IsCompleted = true;
            findToDoItem.CompletedAt = DateTime.Now;

            await _todoListDbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> MarkTaskStart(ClaimsPrincipal currentUser, int id)
        {
            var user =await _userManager.GetUserAsync(currentUser);
            var foundtask = await _todoListDbContext.ToDoItems.Where(x => x.UserId == user.Id).FirstOrDefaultAsync(t => t.Id == id);

            if (foundtask == null)
            {
                return false;
            }

            foundtask.IsStarted = true;

            await _todoListDbContext.SaveChangesAsync();
            return true;
        }

        public async Task<List<TodoDto>> RecentlyCreatedTask(ClaimsPrincipal currentUser)
        {
            var user = await _userManager.GetUserAsync(currentUser);
            var weekAgo = DateTime.UtcNow.AddDays(-7);
            var recenttask = await _todoListDbContext.ToDoItems.Where(u => u.UserId == user.Id).Where(t => t.AtCreated >= weekAgo).Select(t => new TodoDto
            {
                Header = t.Header,
                Description = t.Description,
                AtCreated = t.AtCreated,
                Deadline = t.Deadline,
                CategoryId = t.CategoryId,
                Id = t.Id,
                IsCompleted = t.IsCompleted,
                CompletedAt = t.CompletedAt

            }).ToListAsync();

            return recenttask;



        }
    }
}

