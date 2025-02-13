using System.ComponentModel.DataAnnotations;

namespace FinanceTracker_2._0.Models
{
    public class Account
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string name { get; set; }
        public decimal balance { get; set; } = 0;
        public string currency { get; set; } = "RON";

        public Guid UserId { get; set; }
        public virtual User User { get; set; }
        public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
    }
}
