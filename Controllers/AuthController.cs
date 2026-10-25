
using CareerForgeAI;
using CareerForgeAI.Data;
using CareerForgeAI.ViewModels.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CareerForgeAI.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly PasswordHasher<User> _passwordHasher;

    public AuthController(ApplicationDbContext context)
    {
        _context = context;
        _passwordHasher = new PasswordHasher<User>();
    }

    // =====================================================
    // TEST API
    // GET /api/v1/auth/test
    // =====================================================

    [HttpGet("test")]
    public IActionResult Test()
    {
        return Ok(new
        {
            success = true,
            message = "CareerForgeAI API is working!"
        });
    }

    // =====================================================
    // REGISTER
    // POST /api/v1/auth/register
    // =====================================================

    [HttpPost("register")]
    public async Task<IActionResult> Register(
        [FromBody] RegisterViewModel model)
    {
        Console.WriteLine("Api Call now");
        var email = model.Email.Trim().ToLowerInvariant();

        var existingUser = await _context.Users
            .AnyAsync(u => u.Email == email);

        if (existingUser)
        {
            return Conflict(new
            {
                success = false,
                errors = new Dictionary<string, string[]>
                {
                    ["Email"] = new[]
                    {
                        "An account with this email already exists."
                    }
                }
            });
        }

        var user = new User
        {
            Name = model.Name.Trim(),
            Email = email,
            CreatedAt = DateTime.UtcNow
        };

        user.PasswordHash = _passwordHasher.HashPassword(
            user,
            model.Password
        );

        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            success = true,
            message = "Registration successful."
        });
    }

    // =====================================================
    // LOGIN
    // POST /api/v1/auth/login
    // =====================================================

    [HttpPost("login")]
    public async Task<IActionResult> Login(
        [FromBody] LoginViewModel model)
    {
        var email = model.Email.Trim().ToLowerInvariant();

        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == email);

        if (user == null)
        {
            return Unauthorized(new
            {
                success = false,
                errors = new Dictionary<string, string[]>
                {
                    ["Email"] = new[]
                    {
                        "Invalid email or password."
                    }
                }
            });
        }

        var passwordResult = _passwordHasher.VerifyHashedPassword(
            user,
            user.PasswordHash,
            model.Password
        );

        if (passwordResult == PasswordVerificationResult.Failed)
        {
            return Unauthorized(new
            {
                success = false,
                errors = new Dictionary<string, string[]>
                {
                    ["Password"] = new[]
                    {
                        "Invalid email or password."
                    }
                }
            });
        }

        return Ok(new
        {
            success = true,
            message = "Login successful."
        });
    }
}
