using System.ComponentModel.DataAnnotations;

namespace FinanceTracker_2._0.Models.DTOs.BudgetDTOs
{
    public class UpdateBudgetDTO
    {
        [Required]
        public string BudgetName { get; set; }
        [Required]
        public decimal Amount { get; set; }
        [Required]
        public DateTime start_date { get; set; }
        [Required]
        public DateTime end_date { get; set; }
        [Required]
        public Guid CategoryId { get; set; }
        [Required]
        public Guid UserId { get; set; }
    }
}
