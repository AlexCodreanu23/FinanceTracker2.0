using AutoMapper;
using FinanceTracker_2._0.Models.DTOs.CategoryDTOs;
using FinanceTracker_2._0.Repositories;
using FinanceTracker_2._0.Models;
using FinanceTracker_2._0.Models.DTOs.BudgetDTOs;

namespace FinanceTracker_2._0.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _mapper = mapper;
            _categoryRepository = categoryRepository;
        }

        public async Task<IEnumerable<CategoryDTO>> GetAllCategoriesAsync()
        {
            var categories = await _categoryRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<CategoryDTO>>(categories);
        }

        public async Task<CategoryDTO> GetCategoryByIdAsync(Guid id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);
            return _mapper.Map<CategoryDTO>(category);
        }

        public async Task CreateCategoryAsync(CreateCategoryDTO categoryDTO)
        {
            var category = _mapper.Map<Category>(categoryDTO);
            await _categoryRepository.AddAsync(category);
        }

        public async Task UpdateCategoryAsync(Guid id, UpdateCategoryDTO categoryDTO)
        {
            var existingCategory = await _categoryRepository.GetByIdAsync(id);
            if (existingCategory == null)
            {
                throw new Exception("Category not found.");
            }
            _mapper.Map(categoryDTO, existingCategory);
            await _categoryRepository.UpdateAsync(existingCategory);
        }

        public async Task DeleteCategoryAsync(Guid id)
        {
            await _categoryRepository.DeleteAsync(id);
        }
    }
}
