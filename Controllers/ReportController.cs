using FinanceTracker_2._0.Models.DTOs.ReportDTOs;
using FinanceTracker_2._0.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinanceTracker_2._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReportDTO>>> GetAllReports()
        {
            var reports = await _reportService.GetAllReportsAsync();
            return Ok(reports);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ReportDTO>>GetReport(Guid id)
        {
            var report = await _reportService.GetReportByIdAsync(id);
            return Ok(report);
        }

        [HttpPost]
        public async Task<ActionResult<ReportDTO>>CreateReport(CreateReportDTO reportDTO)
        {
            await _reportService.CreateReportAsync(reportDTO);
            return Ok(reportDTO);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ReportDTO>>UpdateReport(UpdateReportDTO reportDTO, Guid id)
        {
            if(id != reportDTO.Id)
            {
                return BadRequest("Id mismatch");
            }
            await _reportService.UpdateReportAsync(reportDTO);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult>DeleteReport(Guid id)
        {
            await _reportService.DeleteReportAsync(id);
            return NoContent(); 
        }

    }
}
