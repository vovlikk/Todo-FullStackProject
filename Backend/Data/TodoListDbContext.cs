using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TodoList_Fullstack.Controllers.Authentication;
using TodoList_Fullstack.Models.Support;

namespace TodoList_Fullstack.Data
{
    public class TodoListDbContext : IdentityDbContext<IdentityUser>
    {
        public TodoListDbContext(DbContextOptions<TodoListDbContext> options) : base(options)
        {

        }

        public DbSet<SupportSms> Supports { get; set; }



    }
}
