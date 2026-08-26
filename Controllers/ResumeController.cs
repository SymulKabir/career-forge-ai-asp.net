using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using CareerForgeAI.Models;

namespace CareerForgeAI.Controllers;

[Route("resume")]
public class ResumeController : Controller
{
    [HttpGet("{resumeId}")]
    public IActionResult Index(string resumeId)
    {
        // Later you can load the resume from DB using resumeId.
        // var resume = _resumeService.GetById(resumeId);

        ViewBag.ResumeId = resumeId;

        return View();
    }

    [ResponseCache(
        Duration = 0,
        Location = ResponseCacheLocation.None,
        NoStore = true
    )]
    [HttpGet("error")]
    public IActionResult Error()
    {
        return View(
            new ErrorViewModel
            {
                RequestId =
                    Activity.Current?.Id ??
                    HttpContext.TraceIdentifier
            }
        );
    }
}