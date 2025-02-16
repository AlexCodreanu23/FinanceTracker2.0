using FinanceTracker_2._0.Models.DTOs.ReportDTOs;

namespace FinanceTracker_2._0.Services
{
    public interface IReportService 
    {
        Task<IEnumerable<ReportDTO>> GetAllReportsAsync();
        Task<ReportDTO> GetReportByIdAsync(Guid id);
        Task CreateReportAsync(CreateReportDTO reportDTO);
        Task UpdateReportAsync(Guid id, UpdateReportDTO reportDTO);
        Task DeleteReportAsync(Guid id);
        Task<IEnumerable<ReportDTO>> GetReportsForUserAsync(Guid id);
    }
}
