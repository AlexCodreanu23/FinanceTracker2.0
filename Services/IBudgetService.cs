using FinanceTracker_2._0.Models.DTOs.BudgetDTOs;

namespace FinanceTracker_2._0.Services
{
    public interface IBudgetService
    {
        Task<IEnumerable<BudgetDTO>> GetAllBudgetsAsync();
        Task<BudgetDTO> GetBudgetByIdAsync(Guid id);
        Task CreateBudgetAsync(CreateBudgetDTO budgetDTO);
        Task UpdateBudgetAsync(Guid id, UpdateBudgetDTO budgetDTO);
        Task DeleteBudgetAsync(Guid id);
    }
}
