using System.ComponentModel.DataAnnotations;

namespace FinanceTracker_2._0.Models.DTOs.UserDTOs
{
    public class CreateUserDTO
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
