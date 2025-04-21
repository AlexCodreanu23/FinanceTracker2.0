using System.ComponentModel.DataAnnotations;

namespace FinanceTracker_2._0.Models.DTOs.TransactionDTOs
{
    public class CreateTransactionDTO
    {
        [Required]
        public decimal Amount { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        [Required]
        public Guid AccountId { get; set; }
        [Required]
        public Guid CategoryId { get; set; }
        [Required]
        public Guid UserId { get; set; }
        public string Type { get; set; }
    }
}
