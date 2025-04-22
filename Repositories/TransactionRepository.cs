using FinanceTracker_2._0.Data;
using FinanceTracker_2._0.Models;
using Microsoft.EntityFrameworkCore;

namespace FinanceTracker_2._0.Repositories
{
    public class TransactionRepository
    : GenericRepository<Transaction>, ITransactionRepository
    {
        private readonly ApplicationDbContext _context;

        public TransactionRepository(ApplicationDbContext context)
            : base(context)
        {
            _context = context;  
        }

        public override async Task<IEnumerable<Transaction>> GetAllAsync()
        {
            return await _context.Transactions
                                 .Include(t => t.Category)
                                 .ToListAsync();
        }

        public override async Task<Transaction> GetByIdAsync(Guid id)
        {
            return await _context.Transactions
                                 .Include(t => t.Category)
                                 .FirstOrDefaultAsync(t => t.Id == id);
        }
    }
}
