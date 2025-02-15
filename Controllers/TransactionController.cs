using FinanceTracker_2._0.Models.DTOs.TransactionDTOs;
using FinanceTracker_2._0.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinanceTracker_2._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransactionDTO>>> GetAllTransactions()
        {
            var transactions = await _transactionService.GetAllTransactionsAsync();
            return  Ok(transactions);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionDTO>>GetTransaction(Guid id)
        {
            var transaction = await _transactionService.GetTransactionByIdAsync(id);
            return Ok(transaction);
        }

        [HttpPost]
        public async Task<ActionResult<TransactionDTO>>CreateTransaction(CreateTransactionDTO transactionDTO)
        {
            await _transactionService.CreateTransactionAsync(transactionDTO);
            return Ok(transactionDTO);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TransactionDTO>>UpdateTransaction(UpdateTransactionDTO transactionDTO, Guid id)
        {
            await _transactionService.UpdateTransactionAsync(id, transactionDTO);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult>DeleteTransaction(Guid id)
        {
            await _transactionService.DeleteTransactionAsync(id);
            return NoContent();
        }

    }
}
