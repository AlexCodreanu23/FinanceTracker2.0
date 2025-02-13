using FinanceTracker_2._0.Data;
using FinanceTracker_2._0.Models;

namespace FinanceTracker_2._0.Repositories
{
    public class TransactionRepository : GenericRepository<Transaction>, ITransactionRepository
    {
        public TransactionRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
