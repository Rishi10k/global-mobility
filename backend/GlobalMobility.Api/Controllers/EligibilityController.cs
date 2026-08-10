using GlobalMobility.Api.DTOs;
using GlobalMobility.Api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Diagnostics;

namespace GlobalMobility.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EligibilityController : ControllerBase
{
    private readonly IEligibilityService _eligibilityService;
    private readonly IEmailService _emailService;

    public EligibilityController(IEligibilityService eligibilityService, IEmailService emailService)
    {
        _eligibilityService = eligibilityService;
        _emailService = emailService;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateEligibilityRequest request)
    {
        var result = await _eligibilityService.CreateAsync(request);

        //Trigger the email sending process
        try
        {
            await _emailService.SendEligibilityConfirmationAsync(
                request.Email,
                request.FullName,
                request.CountryPreference
            );
        }
        catch (Exception ex)
        {
            // Optional: Log the error. 
            // We usually don't throw an error here because the data was already saved successfully.
            Console.WriteLine($"Email sending failed: {ex.Message}");
        }

        return Ok(result);
    }
}