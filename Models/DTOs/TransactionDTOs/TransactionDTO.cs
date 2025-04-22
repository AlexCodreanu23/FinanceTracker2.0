namespace FinanceTracker_2._0.Models.DTOs.TransactionDTOs
{
    public class TransactionDTO
    {
        public Guid Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public Guid AccountId { get; set; }
        public Guid CategoryId { get; set; }
        public Guid UserId { get; set; }
        public string CategoryName { get; set; }
        public string Type { get; set; }
    }
}
