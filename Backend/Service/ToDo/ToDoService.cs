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


        public async Task<bool> DeleteTask(int id)
        {
            var findToDoItem = await _todoListDbContext.ToDoItems.FirstOrDefaultAsync(x => x.Id == id);
            
            if(findToDoItem == null)
            {
                return false;
            }
            _todoListDbContext.ToDoItems.Remove(findToDoItem);
            await _todoListDbContext.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<ToDoItem>> GetAllToDoItems()
        {
            
            return await _todoListDbContext.ToDoItems.ToListAsync();
        }

        public async Task<bool> MarkTaskAsCompleted(int id)
        {
            var findToDoItem = await _todoListDbContext.ToDoItems.FirstOrDefaultAsync(x => x.Id == id);
            if (findToDoItem == null)
            {
                return false;
            }
            findToDoItem.IsCompleted = true;
            _todoListDbContext.ToDoItems.Update(findToDoItem);
            await _todoListDbContext.SaveChangesAsync();
            return true;
        }
    }
}
