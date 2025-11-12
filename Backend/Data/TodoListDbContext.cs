using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;
using TodoList_Fullstack.Controllers.Authentication;
using TodoList_Fullstack.Models.CategoryModel;
using TodoList_Fullstack.Models.Support;
using TodoList_Fullstack.Models.ToDo;

namespace TodoList_Fullstack.Data
{
    public class TodoListDbContext : IdentityDbContext<IdentityUser>
    {
        public TodoListDbContext(DbContextOptions<TodoListDbContext> options) : base(options)
        {

        }

        public DbSet<SupportSms> Supports { get; set; }
        public DbSet<ToDoItem> ToDoItems { get; set; }

        public DbSet<Category> Categories { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, CategoryName = "Work" },
                new Category { Id = 2, CategoryName = "Personal" },
                new Category { Id = 3, CategoryName = "Shopping" },
                new Category { Id = 4, CategoryName = "Health" },
                new Category {Id = 5,CategoryName = "Finance"});
    }


       



    }
}
