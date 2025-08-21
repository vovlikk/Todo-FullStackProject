using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TodoList_Fullstack.Controllers.Authentication;

namespace TodoList_Fullstack.Data
{
    public class TodoListDbContext : IdentityDbContext<IdentityUser>
    {
        public TodoListDbContext(DbContextOptions<TodoListDbContext> options) : base(options)
        {

        }
    
    
    
    }
}
