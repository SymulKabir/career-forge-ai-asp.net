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

    [HttpGet("cover-letter")]
    public IActionResult CoverLetter()
    {
        return View();
    }
    [HttpGet("job-matcher")]
    public IActionResult JobMatcher()
    {
        return View();
    }
    [HttpGet("ai-interview")]
    public IActionResult AiInterview()
    {
        return View();
    }
    [HttpGet("career-roadmap")]
    public IActionResult CareerRoadmap()
    {
        return View();
    }
    [HttpGet("skill-analyzer")]
    public IActionResult SkillAnalyzer()
    {
        return View();
    }
    [HttpGet("saved-jobs")]
    public IActionResult SavedJobs()
    {
        return View();
    }
    [HttpGet("applications")]
    public IActionResult Applications()
    {
        return View();
    }
    [HttpGet("profile")]
    public IActionResult Profile()
    {
        return View();
    }
    [HttpGet("settings")]
    public IActionResult Settings()
    {
        return View();
    }
}