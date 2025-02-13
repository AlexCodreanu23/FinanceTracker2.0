using FinanceTracker_2._0.Data;
using FinanceTracker_2._0.Models;

namespace FinanceTracker_2._0.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
