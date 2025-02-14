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

        public async Task UpdateAccountAsync(UpdateAccountDTO accountDto)
        {
            var account = _mapper.Map<Account>(accountDto);
            await _accountRepository.UpdateAsync(account);
        }

        public async Task DeleteAccountAsync(Guid id)
        {
            await _accountRepository.DeleteAsync(id);
        }
    }
}
