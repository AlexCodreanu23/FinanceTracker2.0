namespace FinanceTracker_2._0.Models.DTOs.BudgetDTOs
{
    public class BudgetDTO
    {
        public Guid Id { get; set; }
        public string BudgetName { get; set; }
        public decimal Amount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public Guid CategoryId { get; set; }
        public Guid UserId { get; set; }
    }
}
