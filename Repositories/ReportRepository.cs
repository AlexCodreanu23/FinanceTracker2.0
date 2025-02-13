using FinanceTracker_2._0.Data;
using FinanceTracker_2._0.Models;

namespace FinanceTracker_2._0.Repositories
{
    public class ReportRepository : GenericRepository<Report>, IReportRepository
    {
        public ReportRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
