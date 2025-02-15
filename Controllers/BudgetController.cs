using FinanceTracker_2._0.Models.DTOs.BudgetDTOs;
using FinanceTracker_2._0.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinanceTracker_2._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BudgetController : ControllerBase
    {
        private readonly IBudgetService _budgetService;

        public BudgetController(IBudgetService budgetService)
        {
            _budgetService = budgetService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BudgetDTO>>> GetAllBudgets()
        {
            var budgets = await _budgetService.GetAllBudgetsAsync();
            return Ok(budgets);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BudgetDTO>> GetBudget(Guid id)
        {
            var budget = await _budgetService.GetBudgetByIdAsync(id);
            if (budget == null)
            {
                return NotFound();
            }
            return Ok(budget);
        }

        [HttpPost]
        public async Task<ActionResult<BudgetDTO>> CreateBudget(CreateBudgetDTO createBudget)
        {
            await _budgetService.CreateBudgetAsync(createBudget);
            return Ok(createBudget);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateBudget(Guid id, UpdateBudgetDTO updateBudgetDTO)
        {
            await _budgetService.UpdateBudgetAsync(id, updateBudgetDTO);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBudget(Guid id)
        {
            await _budgetService.DeleteBudgetAsync(id);
            return NoContent();
        }   
    }
}
