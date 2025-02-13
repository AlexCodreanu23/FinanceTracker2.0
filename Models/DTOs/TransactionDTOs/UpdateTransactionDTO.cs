using System.ComponentModel.DataAnnotations;

namespace FinanceTracker_2._0.Models.DTOs.TransactionDTOs
{
    public class UpdateTransactionDTO
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        [Required]
        public Guid AccountId { get; set; }
        [Required]
        public Guid CategoryId { get; set; }
        [Required]
        public Guid UserId { get; set; }
    }
}
