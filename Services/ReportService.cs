using AutoMapper;
using FinanceTracker_2._0.Models.DTOs.ReportDTOs;
using FinanceTracker_2._0.Repositories;
using FinanceTracker_2._0.Models;
using FinanceTracker_2._0.Models.DTOs.BudgetDTOs;

namespace FinanceTracker_2._0.Services
{
    public class ReportService : IReportService
    {
        private readonly IMapper _mapper;
        private readonly IReportRepository _reportRepository;
    
        public ReportService (IMapper mapper, IReportRepository reportRepository)
        {
            _mapper = mapper;
            _reportRepository = reportRepository;
        }
        public async Task<IEnumerable<ReportDTO>> GetAllReportsAsync()
        {
            var reports = await _reportRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<ReportDTO>>(reports);
        }

        public async Task<ReportDTO> GetReportByIdAsync(Guid id)
        {
            var report = await _reportRepository.GetByIdAsync(id);
            return _mapper.Map<ReportDTO>(report);
        }

        public async Task CreateReportAsync(CreateReportDTO reportDTO)
        {
            var report = _mapper.Map<Report>(reportDTO);
            await _reportRepository.AddAsync(report);
        }

        public async Task UpdateReportAsync(Guid id,UpdateReportDTO reportDTO)
        {
            var existingReport = await _reportRepository.GetByIdAsync(id);
            if (existingReport == null)
            {
                throw new Exception("Report not found.");
            }
            _mapper.Map(reportDTO, existingReport);
            await _reportRepository.UpdateAsync(existingReport);
        }

        public async Task DeleteReportAsync(Guid id)
        {
            await _reportRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<ReportDTO>>GetReportsForUserAsync(Guid id)
        {
            var reports = await _reportRepository.GetAllAsync();
            var filtered = reports.Where(r => r.UserId == id);
            return _mapper.Map<IEnumerable<ReportDTO>>(filtered);
        }

    }
}
