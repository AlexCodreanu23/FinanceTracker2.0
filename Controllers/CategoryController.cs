using FinanceTracker_2._0.Models.DTOs.CategoryDTOs;
using FinanceTracker_2._0.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinanceTracker_2._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDTO>>> GetAllCategories() 
        {
            var categories = await _categoryService.GetAllCategoriesAsync();
            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDTO>>GetCategory(Guid id)
        {
            var category = await _categoryService.GetCategoryByIdAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        [HttpPost]
        public async Task<ActionResult<CategoryDTO>>CreateCategory(CreateCategoryDTO categoryDTO)
        {
            await _categoryService.CreateCategoryAsync(categoryDTO);
            return Ok(categoryDTO);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<CategoryDTO>>UpdateCategory(UpdateCategoryDTO categoryDTO, Guid id)
        {
            if (id != categoryDTO.Id)
            {
                return BadRequest("Id mismatch");
            }
            await _categoryService.UpdateCategoryAsync(categoryDTO);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult>DeleteCategory(Guid id)
        {
            await _categoryService.DeleteCategoryAsync(id);
            return NoContent();
        }
    }
}
