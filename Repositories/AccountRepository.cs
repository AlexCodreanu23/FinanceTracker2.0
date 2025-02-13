using FinanceTracker_2._0.Models;
using FinanceTracker_2._0.Data;

namespace FinanceTracker_2._0.Repositories
{
    public class AccountRepository : GenericRepository<Account>, IAccountRepository
    {
        public AccountRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
