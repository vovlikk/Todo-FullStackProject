using Microsoft.EntityFrameworkCore;
using TodoList_Fullstack.Data;
using TodoList_Fullstack.Dto.ToDo;
using TodoList_Fullstack.Interface.ToDo;
using TodoList_Fullstack.Models.ToDo;

namespace TodoList_Fullstack.Service.ToDo
{
    public class ToDoService : IToDoInterface
    {
        private readonly TodoListDbContext _todoListDbContext;
        public ToDoService(TodoListDbContext todoListDbContext)
        {
            _todoListDbContext = todoListDbContext;
        }

        public async Task<IEnumerable<string>> Category()
        {
            var category = await _todoListDbContext.ToDoItems
                .Select(x => x.Header)
                .ToListAsync();

            return category;
        }

        public async Task<bool> CreateToDoItem(TodoDto todoDto)
        {
            if(todoDto.Header.Length > 30 || todoDto.Description.Length > 500)
            {
                return false;
            }

            var item = new ToDoItem
            {
                Header = todoDto.Header,
                Description = todoDto.Description,
                IsCompleted = false,
                AtCreated = DateTime.UtcNow,
                Deadline = todoDto.Deadline,


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
