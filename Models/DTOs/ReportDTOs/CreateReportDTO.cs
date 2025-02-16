using System.ComponentModel.DataAnnotations;

namespace FinanceTracker_2._0.Models.DTOs.ReportDTOs
{
    public class CreateReportDTO
    {
        [Required]
        public decimal AmountSpent { get; set; }
        [Required]
        public string month_year { get; set; }
        [Required]
        public Guid UserId { get; set; }
    }
}
