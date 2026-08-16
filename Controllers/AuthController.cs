
using CareerForgeAI;
using CareerForgeAI.Data;
using CareerForgeAI.ViewModels.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CareerForgeAI.Controllers;

public class AuthController : Controller
{
    private readonly ApplicationDbContext _context;
    private readonly PasswordHasher<User> _passwordHasher;

    public AuthController(ApplicationDbContext context)
    {
        _context = context;
        _passwordHasher = new PasswordHasher<User>();
    }

    // =====================================================
    // REGISTER
    // =====================================================

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Register(RegisterViewModel model)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState
                .Where(x => x.Value?.Errors.Count > 0)
                .ToDictionary(
                    x => x.Key,
                    x => x.Value!.Errors
                        .Select(e => e.ErrorMessage)
                        .ToArray()
                );

            return BadRequest(new
            {
                success = false,
                errors
            });
        }

        var email = model.Email.Trim().ToLowerInvariant();

        var existingUser = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == email);

        if (existingUser != null)
        {
            return BadRequest(new
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
    // =====================================================

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(LoginViewModel model)
    {
        // -----------------------------------------
        // MODEL VALIDATION
        // -----------------------------------------

        if (!ModelState.IsValid)
        {
            var errors = ModelState
                .Where(x => x.Value?.Errors.Count > 0)
                .ToDictionary(
                    x => x.Key,
                    x => x.Value!.Errors
                        .Select(e => e.ErrorMessage)
                        .ToArray()
                );

            return BadRequest(new
            {
                success = false,
                errors
            });
        }

        // -----------------------------------------
        // NORMALIZE EMAIL
        // -----------------------------------------

        var email = model.Email.Trim().ToLowerInvariant();

        // -----------------------------------------
        // FIND USER
        // -----------------------------------------

        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == email);

        // -----------------------------------------
        // USER NOT FOUND
        // -----------------------------------------

        if (user == null)
        {
            return BadRequest(new
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

        // -----------------------------------------
        // VERIFY PASSWORD
        // -----------------------------------------

        var passwordResult = _passwordHasher.VerifyHashedPassword(
            user,
            user.PasswordHash,
            model.Password
        );

        if (passwordResult == PasswordVerificationResult.Failed)
        {
            return BadRequest(new
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

        // -----------------------------------------
        // LOGIN SUCCESS
        // -----------------------------------------

        return Ok(new
        {
            success = true,
            message = "Login successful."
        });
    }
}
