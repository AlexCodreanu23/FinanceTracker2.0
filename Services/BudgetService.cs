using AutoMapper;
using FinanceTracker_2._0.Models;
using FinanceTracker_2._0.Repositories;
using FinanceTracker_2._0.Models.DTOs.BudgetDTOs;

namespace FinanceTracker_2._0.Services
{
    public class BudgetService :  IBudgetService
    {
        private readonly IBudgetRepository _budgetRepository;
        private readonly IMapper _mapper;

        public BudgetService(IBudgetRepository budgetRepository, IMapper mapper)
        {
            _budgetRepository = budgetRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<BudgetDTO>>GetAllBudgetsAsync()
        {
            var budgets = await _budgetRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<BudgetDTO>>(budgets);
        }

        public async Task<BudgetDTO> GetBudgetByIdAsync(Guid id)
        {
            var budget = await _budgetRepository.GetByIdAsync(id);
            return _mapper.Map<BudgetDTO>(budget);
        }

        public async Task CreateBudgetAsync(CreateBudgetDTO budgetDTO)
        {
            var budget = _mapper.Map<Budget>(budgetDTO);
            await _budgetRepository.AddAsync(budget);
        }

        public async Task UpdateBudgetAsync(Guid id, UpdateBudgetDTO budgetDTO)
        {
            var existingBudget = await _budgetRepository.GetByIdAsync(id);
            if (existingBudget == null)
            {
                throw new Exception("Budget not found.");
            }
            _mapper.Map(budgetDTO, existingBudget);
            await _budgetRepository.UpdateAsync(existingBudget);
        }

        public async Task DeleteBudgetAsync(Guid id)
        {
            await _budgetRepository.DeleteAsync(id);
        }

    }
}
