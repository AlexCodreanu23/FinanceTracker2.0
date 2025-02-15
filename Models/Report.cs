namespace FinanceTracker_2._0.Models
{
    public class Report : IEntity
    {
        public Guid Id { get; set; }

        public decimal amountSpent { get; set; }

        public string month_year {  get; set; } 
        
        public DateTime createdAt { get; set; } = DateTime.UtcNow;

        public Guid UserId { get; set; }
        public virtual User User { get; set; }
    }
}
