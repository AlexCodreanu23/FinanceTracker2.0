using FinanceTracker_2._0.Models.DTOs.UserDTOs;
using FinanceTracker_2._0.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinanceTracker_2._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetUser(Guid id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<UserDTO>> CreateUser(CreateUserDTO userDTO)
        {
            await _userService.CreateUserAsync(userDTO);
            return Ok(userDTO);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<UserDTO>>UpdateUser(UpdateUserDTO userDTO, Guid id)
        {
            if (id != userDTO.Id)
            {
                return BadRequest("Id mismatch");
            }
            await _userService.UpdateUserAsync(userDTO);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult>DeleteUser(Guid id)
        {
            await _userService.DeleteUserAsync(id);
            return NoContent(); 
        }

    }
}
