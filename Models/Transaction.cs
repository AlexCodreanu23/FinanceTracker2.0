using System.ComponentModel.DataAnnotations;

namespace FinanceTracker_2._0.Models
{
    public class Transaction
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public decimal amount { get; set; }
        public DateTime date { get; set; } = DateTime.UtcNow;
        public Guid AccountId { get; set; }
        public Guid CategoryId { get; set; }
        public virtual Category Category { get; set; }
        public virtual Account Account { get; set; }

        public Guid UserId { get; set; }
        public virtual User User { get; set; }
    }
}
