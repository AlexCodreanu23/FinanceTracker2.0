using System.ComponentModel.DataAnnotations;

namespace FinanceTracker_2._0.Models.DTOs.BudgetDTOs
{
    public class CreateBudgetDTO
    {
        [Required]
        public string BudgetName { get; set; }
        [Required]
        public decimal Amount { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        public Guid CategoryId { get; set; }
        [Required]
        public Guid UserId { get; set; }
    }
}
