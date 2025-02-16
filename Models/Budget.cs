namespace FinanceTracker_2._0.Models
{
    public class Budget : IEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string budgetName { get; set; }
        public decimal amount { get; set; }
        
        public DateTime start_date { get; set; }

        public DateTime end_date { get; set; }

        public DateTime createdAt { get; set; }

        public Guid CategoryId { get; set; }
        public virtual Category Category { get; set; }

        public Guid UserId { get; set; }
        public virtual User User { get; set; }
    }
}
