using System.Security.Claims;
using TodoList_Fullstack.Dto.Category;
using TodoList_Fullstack.Dto.CategoryDto;

namespace TodoList_Fullstack.Interface.Category
{
    public interface ICategoryInterface
    {
        Task<List<SendingCategoryDto>> GetUserCategory(ClaimsPrincipal currentUser);

        Task<bool> AddNewCategory(ClaimsPrincipal currentUser, AddCategoryDto categoryDto);

        Task<bool> DeleteCategory(ClaimsPrincipal currentUser, int categoryId);
    }
}
