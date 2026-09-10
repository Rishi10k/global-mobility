using GlobalMobility.Api.Data;
using GlobalMobility.Api.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GlobalMobility.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(
        ApplicationDbContext context,
        IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(
        [FromBody] AdminLoginDto request)
    {
        // Validate request
        if (string.IsNullOrWhiteSpace(request.Username) ||
            string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(
                "Username and password are required.");
        }

        // Find admin
        var admin = await _context.Admins
            .FirstOrDefaultAsync(a =>
                a.Username == request.Username);

        if (admin == null)
        {
            return Unauthorized(
                "Invalid username or password.");
        }

        // Verify password
        var passwordValid =
            BCrypt.Net.BCrypt.Verify(
                request.Password,
                admin.PasswordHash);

        if (!passwordValid)
        {
            return Unauthorized(
                "Invalid username or password.");
        }

        // Create JWT claims
        var claims = new[]
        {
            new Claim(
                ClaimTypes.Name,
                admin.Username),

            new Claim(
                ClaimTypes.Role,
                "Admin")
        };

        // Get JWT key from appsettings.json
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(
                _configuration["Jwt:Key"]!));

        var credentials = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256);

        // Create JWT
        var token = new JwtSecurityToken(
            issuer:
                _configuration["Jwt:Issuer"],

            audience:
                _configuration["Jwt:Audience"],

            claims: claims,

            expires:
                DateTime.UtcNow.AddHours(8),

            signingCredentials:
                credentials
        );

        // Convert JWT to string
        var tokenString =
            new JwtSecurityTokenHandler()
                .WriteToken(token);

        // Return token to Angular
        return Ok(new
        {
            token = tokenString,
            username = admin.Username
        });
    }
}