using FinanceTracker_2._0.Models.DTOs.UserDTOs;
using FinanceTracker_2._0.Models;
using FinanceTracker_2._0.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FinanceTracker_2._0.Controllers
{
        [Route("api/[controller]")]
        [ApiController]
        public class AuthController : ControllerBase
        {
            private readonly UserManager<User> _userManager;
            private readonly IJwtTokenService _jwtTokenService;

            public AuthController(UserManager<User> userManager, IJwtTokenService jwtTokenService)
            {
                _userManager = userManager;
                _jwtTokenService = jwtTokenService;
            }

            [HttpPost("login")]
            public async Task<ActionResult> Login([FromBody] LoginDTO loginDTO)
            {
                var user = await _userManager.FindByEmailAsync(loginDTO.Email);
                if (user == null)
                {
                    return Unauthorized("Invalid credentials.");
                }

                var result = await _userManager.CheckPasswordAsync(user, loginDTO.Password);
                if (!result)
                {
                    return Unauthorized("Invalid credentials.");
                }

                var token = _jwtTokenService.GenerateToken(user);
                return Ok(new { token });
            }
        }
    }
