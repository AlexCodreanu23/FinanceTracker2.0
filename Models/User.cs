using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace FinanceTracker_2._0.Models
{
    public class User : IdentityUser<Guid>
    {
        [Required]
        public string firstName { get; set; }

        [Required]
        public string lastName { get; set; }

        public DateTime createdAt { get; set; } = DateTime.UtcNow;

        public ICollection<Account> Accounts { get; set; } = new List<Account>();

        public ICollection<Report> Reports { get; set; } = new List<Report>();

        public ICollection<Budget> Budgets { get; set; } = new List<Budget>();

        public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
    }

}
