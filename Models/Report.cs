namespace FinanceTracker_2._0.Models
{
    public class Report
    {
        public Guid Id { get; set; }

        public decimal amountSpent { get; set; }

        public string month_year {  get; set; } 
        
        public DateTime createdAt { get; set; } = DateTime.UtcNow;

        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
