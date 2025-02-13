using System.ComponentModel.DataAnnotations;

namespace FinanceTracker_2._0.Models
{
    public class Category
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string name { get; set; } 

        public ICollection<Transaction>? Transactions { get; set; }

        public ICollection<Budget>? Budgets { get; set; }
    }
}
