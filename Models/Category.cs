using System.ComponentModel.DataAnnotations;

namespace FinanceTracker_2._0.Models
{
    public class Category : IEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string name { get; set; }

        public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>(); 

        public ICollection<Budget> Budgets { get; set; } = new List<Budget>();
    }
}
