namespace FinanceTracker_2._0.Models.DTOs.ReportDTOs
{
    public class ReportDTO
    {
        public Guid Id { get; set; }
        public decimal AmountSpent { get; set; }
        public string month_year { get; set; }
        public DateTime CreatedAt { get; set; }
        public Guid UserId { get; set; }
    }
}
