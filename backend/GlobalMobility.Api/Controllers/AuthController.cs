using GlobalMobility.Api.Data;
using GlobalMobility.Api.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GlobalMobility.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AuthController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(
        [FromBody] AdminLoginDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Username) ||
            string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest("Username and password are required.");
        }

        var admin = await _context.Admins
            .FirstOrDefaultAsync(a =>
                a.Username == request.Username);

        if (admin == null)
        {
            return Unauthorized("Invalid username or password.");
        }

        if (!BCrypt.Net.BCrypt.Verify(
        request.Password,
        admin.PasswordHash))
        {
            return Unauthorized("Invalid username or password.");
        }

        return Ok(new
        {
            message = "Login successful"
        });
    }
}