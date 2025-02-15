using System.ComponentModel.DataAnnotations;

namespace FinanceTracker_2._0.Models.DTOs.ReportDTOs
{
    public class UpdateReportDTO
    {
        [Required]
        public decimal AmountSpent { get; set; }
        [Required]
        public string MonthYear { get; set; }
        [Required]
        public Guid UserId { get; set; }
    }
}
