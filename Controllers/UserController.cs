using FinanceTracker_2._0.Models.DTOs.UserDTOs;
using FinanceTracker_2._0.Models.DTOs.TransactionDTOs;
using FinanceTracker_2._0.Models.DTOs.AccountDTOs;
using FinanceTracker_2._0.Models.DTOs.ReportDTOs;
using FinanceTracker_2._0.Models.DTOs.BudgetDTOs;
using FinanceTracker_2._0.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinanceTracker_2._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITransactionService _transactionService;
        private readonly IAccountService _accountService;
        private readonly IReportService _reportService;
        private readonly IBudgetService _budgetService;

        public UserController(IUserService userService, ITransactionService transactionService, IAccountService accountService, IReportService reportService, IBudgetService budgetService)
        {
            _userService = userService;
            _transactionService = transactionService;
            _accountService = accountService;
            _reportService = reportService;
            _budgetService = budgetService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetUser(Guid id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<UserDTO>> CreateUser(CreateUserDTO userDTO)
        {
            await _userService.CreateUserAsync(userDTO);
            return Ok(userDTO);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<UserDTO>> UpdateUser(UpdateUserDTO userDTO, Guid id)
        {
            await _userService.UpdateUserAsync(id, userDTO);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(Guid id)
        {
            await _userService.DeleteUserAsync(id);
            return NoContent();
        }

        [HttpGet("{id}/transactions")]
        public async Task<ActionResult<IEnumerable<TransactionDTO>>> GetUserTransactions(Guid id)
        {
            var transactions = await _transactionService.GetTransactionsForUserAsync(id);
            if (transactions == null || !transactions.Any())
            {
                return NotFound("No transactions found for this user.");
            }
            return Ok(transactions);
        }

        [HttpGet("{id}/accounts")]
        public async Task<ActionResult<IEnumerable<AccountDTO>>> GetUserAccounts(Guid id)
        {
            var accounts = await _accountService.GetAccountsForUserAsync(id);
            if (accounts == null || !accounts.Any())
            {
                return NotFound("No accounts found for this user.");
            }
            return Ok(accounts);
        }

        [HttpGet("{id}/reports")]
        public async Task<ActionResult<IEnumerable<ReportDTO>>> GetUserReports(Guid id)
        {
            var reports = await _reportService.GetReportsForUserAsync(id);
            if (reports == null || !reports.Any())
            {
                return NotFound("No reports found for this user.");
            }
            return Ok(reports);
        }

        [HttpGet("{id}/budgets")]
        public async Task<ActionResult<IEnumerable<BudgetDTO>>> GetUserBudgets(Guid id)
        {
            var budgets = await _budgetService.GetBudgetsForUserAsync(id);
            if (budgets == null || !budgets.Any())
            {
                return NotFound("No budgets found for this user.");
            }
            return Ok(budgets);
        }
    }
}
