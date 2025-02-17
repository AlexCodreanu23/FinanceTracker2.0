using System.ComponentModel.DataAnnotations;

namespace FinanceTracker_2._0.Models.DTOs.UserDTOs
{
    public class LoginDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
