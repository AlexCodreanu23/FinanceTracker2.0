using FinanceTracker_2._0.Models;

namespace FinanceTracker_2._0.Services
{
    public interface IJwtTokenService
    {
        string GenerateToken(User user);
    }
}
