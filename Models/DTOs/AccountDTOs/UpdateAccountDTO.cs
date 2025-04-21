using System.ComponentModel.DataAnnotations;

namespace FinanceTracker_2._0.Models.DTOs.AccountDTOs
{
    public class UpdateAccountDTO
    {
        [Required]
        public string Name { get; set; }
        public decimal Balance { get; set; }
        public string Currency { get; set; }
        public string AccountType { get; set; }
    }
}
