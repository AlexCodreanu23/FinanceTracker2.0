namespace FinanceTracker_2._0.Models.DTOs.AccountDTOs
{
    public class AccountDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Balance { get; set; }
        public string Currency { get; set; }
    }
}
