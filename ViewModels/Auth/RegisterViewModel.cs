using System.ComponentModel.DataAnnotations;

namespace CareerForgeAI.ViewModels.Auth;

public class RegisterViewModel
{
    [Required(ErrorMessage = "Name is required.")]
    [StringLength(10, ErrorMessage = "Name cannot exceed 10 characters.")]
    [RegularExpression(
        @"^[a-zA-Z]+(?: [a-zA-Z]+)*$",
        ErrorMessage = "Name can contain only letters and spaces."
    )]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
    [StringLength(255)]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Password is required.")]
    [MinLength(8, ErrorMessage = "Password must be at least 8 characters.")]
    public string Password { get; set; } = string.Empty;
}