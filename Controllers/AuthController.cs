using FinanceTracker_2._0.Models.DTOs.UserDTOs;
using FinanceTracker_2._0.Models;
using FinanceTracker_2._0.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

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
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDTO.Password))
                return Unauthorized("Invalid credentials.");

            var token = _jwtTokenService.GenerateToken(user);
            return Ok(new
            {
                token,
                userId = user.Id,
                firstName = user.firstName,
                lastName = user.lastName
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO dto)
        {
            var user = new User
            {
                UserName = dto.Email,
                Email = dto.Email,
                firstName = dto.FirstName,
                lastName = dto.LastName,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            var token = _jwtTokenService.GenerateToken(user);
            return Ok(new
            {
                token,
                firstName = user.firstName,
                lastName = user.lastName
            });
        }
    }
}