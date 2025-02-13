using System.ComponentModel.DataAnnotations;

namespace FinanceTracker_2._0.Models.DTOs.CategoryDTOs
{
    public class UpdateCategoryDTO
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
