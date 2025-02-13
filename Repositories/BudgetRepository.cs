using FinanceTracker_2._0.Data;
using FinanceTracker_2._0.Models;

namespace FinanceTracker_2._0.Repositories
{
    public class BudgetRepository : GenericRepository<Budget>, IBudgetRepository
    {
        public  BudgetRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
