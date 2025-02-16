using FinanceTracker_2._0.Models.DTOs.TransactionDTOs;

namespace FinanceTracker_2._0.Services
{
    public interface ITransactionService
    {
        Task<IEnumerable<TransactionDTO>> GetAllTransactionsAsync();
        Task<TransactionDTO> GetTransactionByIdAsync(Guid id);
        Task CreateTransactionAsync(CreateTransactionDTO transactionDTO);
        Task UpdateTransactionAsync(Guid id ,UpdateTransactionDTO transactionDTO);
        Task DeleteTransactionAsync(Guid id);
        Task<IEnumerable<TransactionDTO>> GetTransactionsForUserAsync(Guid id);
        Task<IEnumerable<TransactionDTO>> GetTransactionsForAccountAsync(Guid id);
    }
}
