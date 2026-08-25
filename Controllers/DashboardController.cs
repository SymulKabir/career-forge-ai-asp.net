using Microsoft.AspNetCore.Mvc;

namespace CareerForgeAI.Controllers;

[Route("dashboard")]
public class DashboardController : Controller
{
    [HttpGet("")]
    public IActionResult Index()
    {
        return View();
    }

    [HttpGet("profile")]
    public IActionResult Profile()
    {
        return View();
    }
    [HttpGet("resume")]
    public IActionResult Resume()
    {
        return View();
    }
    [HttpGet("ats-checker")]
    public IActionResult AtsChecker()
    {
        return View();
    }
}