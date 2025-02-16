using AutoMapper;
using FinanceTracker_2._0.Models;
using FinanceTracker_2._0.Models.DTOs.AccountDTOs;
using FinanceTracker_2._0.Repositories;

namespace FinanceTracker_2._0.Services
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IMapper _mapper;

        public AccountService(IAccountRepository accountRepository, IMapper mapper)
        {
            _accountRepository = accountRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<AccountDTO>> GetAllAccountsAsync()
        {
            var accounts = await _accountRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<AccountDTO>>(accounts);
        }

        public async Task<AccountDTO> GetAccountByIdAsync(Guid id)
        {
            var account = await _accountRepository.GetByIdAsync(id);
            return _mapper.Map<AccountDTO>(account);
        }

        public async Task CreateAccountAsync(CreateAccountDTO accountDto)
        {
            var account = _mapper.Map<Account>(accountDto);
            await _accountRepository.AddAsync(account);
        }

        public async Task UpdateAccountAsync(Guid id, UpdateAccountDTO accountDTO)
        {
            var existingAccount = await _accountRepository.GetByIdAsync(id);
            if (existingAccount == null)
            {
                throw new Exception("Account not found.");
            }
            _mapper.Map(accountDTO, existingAccount);
            await _accountRepository.UpdateAsync(existingAccount);
        }

        public async Task DeleteAccountAsync(Guid id)
        {
            await _accountRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<AccountDTO>> GetAccountsForUserAsync(Guid id)
        {
            var accounts = await _accountRepository.GetAllAsync();
            var filtered = accounts.Where(a => a.UserId == id);
            return _mapper.Map<IEnumerable<AccountDTO>>(filtered);
        }
    }
}
