using FinanceTracker_2._0.Services;
using Microsoft.AspNetCore.Mvc;
using FinanceTracker_2._0.Models.DTOs.AccountDTOs;
using FinanceTracker_2._0.Models.DTOs.TransactionDTOs;  

namespace FinanceTracker_2._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController :ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly ITransactionService _transactionService;

        public AccountController(IAccountService accountService, ITransactionService transactionService)
        {
            _accountService = accountService;
            _transactionService = transactionService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AccountDTO>>> GetAllAccounts()
        {
            var accounts = await _accountService.GetAllAccountsAsync();
            return Ok(accounts);
        }

        [HttpGet("{id}")]
        public  async Task<ActionResult<AccountDTO>>GetAccount(Guid id)
        {
            var account = await _accountService.GetAccountByIdAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            return Ok(account);
        }

        [HttpPost]
        public async Task<ActionResult<AccountDTO>>CreateAccount(CreateAccountDTO createAccount)
        {
            await _accountService.CreateAccountAsync(createAccount);
            return Ok(createAccount);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAccount(Guid id, UpdateAccountDTO updateAccountDTO)
        {
            await _accountService.UpdateAccountAsync(id, updateAccountDTO);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAccount(Guid id)
        {
            await _accountService.DeleteAccountAsync(id);
            return NoContent();
        }

        [HttpGet("{id}/transactions")]
        public async Task<ActionResult<IEnumerable<TransactionDTO>>> GetAccountTransactions(Guid id)
        {
            var transactions = await _transactionService.GetAllTransactionsAsync();
            if (transactions == null || !transactions.Any())
            {
                return NotFound("No transactions found for this account.");
            }
            return Ok(transactions);
        }
    }
}
