using AutoMapper;
using FinanceTracker_2._0.Models.DTOs.TransactionDTOs;
using FinanceTracker_2._0.Models;
using FinanceTracker_2._0.Repositories;

namespace FinanceTracker_2._0.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly IMapper _mapper;
        private readonly ITransactionRepository _transactionRepository;

        public TransactionService(IMapper mapper, ITransactionRepository transactionRepository)
        {
            _mapper = mapper;
            _transactionRepository = transactionRepository;
        }
        public async Task<IEnumerable<TransactionDTO>> GetAllTransactionsAsync()
        {
            var transactions = await _transactionRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<TransactionDTO>>(transactions);
        }

        public async Task<TransactionDTO> GetTransactionByIdAsync(Guid id)
        {
            var transaction = await _transactionRepository.GetByIdAsync(id);
            return _mapper.Map<TransactionDTO>(transaction);
        }

        public async Task CreateTransactionAsync(CreateTransactionDTO transactionDTO)
        {
            var transaction = _mapper.Map<Transaction>(transactionDTO);
            await _transactionRepository.AddAsync(transaction);
        }

        public async Task UpdateTransactionAsync(Guid id,UpdateTransactionDTO transactionDTO)
        {
            var existingTransaction = await _transactionRepository.GetByIdAsync(id);
            if (existingTransaction == null)
            {
                throw new Exception("Transaction not found.");
            }
            _mapper.Map(transactionDTO, existingTransaction);
            await _transactionRepository.UpdateAsync(existingTransaction);
        }

        public async Task DeleteTransactionAsync(Guid id)
        {
            await _transactionRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<TransactionDTO>> GetTransactionsForUserAsync(Guid id)
        {
            var transactions = await _transactionRepository.GetAllAsync();
            var filtered = transactions.Where(t => t.UserId == id);
            return _mapper.Map<IEnumerable<TransactionDTO>>(filtered);
        }
    }
}
