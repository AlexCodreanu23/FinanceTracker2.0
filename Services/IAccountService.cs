using FinanceTracker_2._0.Models.DTOs.AccountDTOs;

namespace FinanceTracker_2._0.Services
{
    public interface IAccountService
    {
        Task<IEnumerable<AccountDTO>>GetAllAccountsAsync();
        Task<AccountDTO> GetAccountByIdAsync(Guid id);
        Task CreateAccountAsync(CreateAccountDTO accountDTO);
        Task UpdateAccountAsync(UpdateAccountDTO accountDTO);
        Task DeleteAccountAsync(Guid id);
    }
}
