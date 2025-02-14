using FinanceTracker_2._0.Models.DTOs.CategoryDTOs;

namespace FinanceTracker_2._0.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDTO>> GetAllCategoriesAsync();
        Task<CategoryDTO> GetCategoryByIdAsync(Guid id);
        Task CreateCategoryAsync(CreateCategoryDTO categoryDTO);
        Task UpdateCategoryAsync(UpdateCategoryDTO categoryDTO);
        Task DeleteCategoryAsync(Guid id);

    }
}
