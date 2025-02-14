using FinanceTracker_2._0.Services;
using Microsoft.AspNetCore.Mvc;
using FinanceTracker_2._0.Models.DTOs.AccountDTOs;

namespace FinanceTracker_2._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController :ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
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
            if (id != updateAccountDTO.Id)
            {
                return BadRequest("ID mismatch.");
            }

            await _accountService.UpdateAccountAsync(updateAccountDTO);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAccount(Guid id)
        {
            await _accountService.DeleteAccountAsync(id);
            return NoContent();
        }

    }
}
