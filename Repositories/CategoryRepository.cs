using FinanceTracker_2._0.Data;
using FinanceTracker_2._0.Models;

namespace FinanceTracker_2._0.Repositories
{
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
