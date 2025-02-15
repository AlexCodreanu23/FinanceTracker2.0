using FinanceTracker_2._0.Models.DTOs.UserDTOs;

namespace FinanceTracker_2._0.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserDTO>> GetAllUsersAsync();
        Task<UserDTO> GetUserByIdAsync(Guid id);
        Task CreateUserAsync(CreateUserDTO userDTO);
        Task UpdateUserAsync(Guid id, UpdateUserDTO userDTO);
        Task DeleteUserAsync(Guid id);
    }
}
