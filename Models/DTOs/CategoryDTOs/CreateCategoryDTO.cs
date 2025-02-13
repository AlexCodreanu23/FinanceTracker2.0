using System.ComponentModel.DataAnnotations;

namespace FinanceTracker_2._0.Models.DTOs.CategoryDTOs
{
    public class CreateCategoryDTO
    {
        [Required]
        public string Name { get; set; }
    }
}
