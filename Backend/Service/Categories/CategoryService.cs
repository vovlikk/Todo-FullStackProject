using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TodoList_Fullstack.Data;
using TodoList_Fullstack.Dto.Category;
using TodoList_Fullstack.Dto.CategoryDto;
using TodoList_Fullstack.Interface.Category;
using TodoList_Fullstack.Models.CategoryModel;

namespace TodoList_Fullstack.Service.Categories
{
    public class CategoryService : ICategoryInterface
    {
        private readonly TodoListDbContext _todoListDbContext;
        private readonly UserManager<IdentityUser> _userManager;
        public CategoryService(TodoListDbContext todoListDbContext, UserManager<IdentityUser> userManager)
        {
            _todoListDbContext = todoListDbContext;
            _userManager = userManager;
        }
        // Get User Categories
        public async Task<List<SendingCategoryDto>> GetUserCategory(ClaimsPrincipal currentUser)
        {
            var user = await _userManager.GetUserAsync(currentUser);
                    var categories = await _todoListDbContext.Categories
                .Where(c => c.UserId == null || c.UserId == user.Id)
                .Select(c => new SendingCategoryDto
                {
                    Id = c.Id,
                    CategoryName = c.CategoryName,
                    UserId = c.UserId
                }).ToListAsync();
                return categories;
        }

        // Add New Category
        public async Task<bool> AddNewCategory(ClaimsPrincipal currentuser, AddCategoryDto categorydto)
        {
            var user = await _userManager.GetUserAsync(currentuser);
            var foundCategory = await _todoListDbContext.Categories
                          .FirstOrDefaultAsync(x => x.CategoryName == categorydto.CategoryName
                           && (x.UserId == null || x.UserId == user.Id));
            if (foundCategory != null)
            {
                return false;
            }

            var category = new Category
            {
                CategoryName = categorydto.CategoryName,
                UserId = user.Id

            };

            _todoListDbContext.Categories.Add(category);
            await _todoListDbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteCategory(ClaimsPrincipal currentUser, int categoryId)
        {
            var user = await _userManager.GetUserAsync(currentUser);

            var category = await _todoListDbContext.Categories.FirstOrDefaultAsync(c => c.Id == categoryId);

            if (category == null)
            {
                return false; 
            }

            if (category.UserId == null || category.UserId != user.Id)
            {
                return false;
            }

            _todoListDbContext.Categories.Remove(category);
            await _todoListDbContext.SaveChangesAsync(); 

            return true;
        }
    }
}
