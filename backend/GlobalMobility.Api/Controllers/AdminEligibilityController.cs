using ClosedXML.Excel;
using GlobalMobility.Api.DTOs;
using GlobalMobility.Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GlobalMobility.Api.Controllers;

[ApiController]
[Route("api/admin/eligibilities")]
public class AdminEligibilityController : ControllerBase
{
    private readonly IEligibilityRepository _repository;

    public AdminEligibilityController(
        IEligibilityRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] string? name,
        [FromQuery] string? phone,
        [FromQuery] string? email,
        [FromQuery] string? status)
    {
        var records = await _repository.GetAllAsync(
            name,
            phone,
            email,
            status);

        var response = records.Select(x => new EligibilityResponseDto
        {
            Id = x.Id,
            FullName = x.FullName,
            Age = x.Age,
            CountryPreference = x.CountryPreference,
            HighestEducation = x.HighestEducation,
            Occupation = x.Occupation,
            WorkExperience = x.WorkExperience,
            Email = x.Email,
            Phone = x.Phone,
            IeltsScore = x.IeltsScore,
            ResumeUrl = x.ResumeUrl,
            Status = x.Status,
            CreatedOn = x.CreatedOn
        });

        return Ok(response);
    }

    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateStatus(
    int id,
    [FromBody] UpdateEligibilityStatusDto request)
    {
        var allowedStatuses = new[]
        {
        "Pending",
        "Interested",
        "Not Interested"
    };

        if (!allowedStatuses.Contains(request.Status))
        {
            return BadRequest("Invalid status.");
        }

        var updated = await _repository.UpdateStatusAsync(
            id,
            request.Status);

        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpGet("export")]
    public async Task<IActionResult> Export(
    [FromQuery] string? name,
    [FromQuery] string? phone,
    [FromQuery] string? email,
    [FromQuery] string? status)
    {
        var records = await _repository.GetFilteredAsync(
            name,
            phone,
            email,
            status);

        using var workbook = new XLWorkbook();

        var worksheet = workbook.Worksheets.Add("Enquiries");

        worksheet.Cell(1, 1).Value = "Id";
        worksheet.Cell(1, 2).Value = "Full Name";
        worksheet.Cell(1, 3).Value = "Age";
        worksheet.Cell(1, 4).Value = "Country Preference";
        worksheet.Cell(1, 5).Value = "Highest Education";
        worksheet.Cell(1, 6).Value = "Occupation";
        worksheet.Cell(1, 7).Value = "Work Experience";
        worksheet.Cell(1, 8).Value = "Email";
        worksheet.Cell(1, 9).Value = "Phone";
        worksheet.Cell(1, 10).Value = "IELTS / PTE Score";
        worksheet.Cell(1, 11).Value = "Status";
        worksheet.Cell(1, 12).Value = "Created On";

        var row = 2;

        foreach (var record in records)
        {
            worksheet.Cell(row, 1).Value = record.Id;
            worksheet.Cell(row, 2).Value = record.FullName;
            worksheet.Cell(row, 3).Value = record.Age;
            worksheet.Cell(row, 4).Value = record.CountryPreference;
            worksheet.Cell(row, 5).Value = record.HighestEducation;
            worksheet.Cell(row, 6).Value = record.Occupation;
            worksheet.Cell(row, 7).Value = record.WorkExperience;
            worksheet.Cell(row, 8).Value = record.Email;
            worksheet.Cell(row, 9).Value = record.Phone;
            worksheet.Cell(row, 10).Value = record.IeltsScore ?? "";
            worksheet.Cell(row, 11).Value = record.Status;
            worksheet.Cell(row, 12).Value = record.CreatedOn;

            row++;
        }

        worksheet.Columns().AdjustToContents();

        using var stream = new MemoryStream();

        workbook.SaveAs(stream);

        stream.Position = 0;

        var fileName =
            $"EligibilityEnquiries_{DateTime.Now:yyyyMMdd_HHmmss}.xlsx";

        return File(
            stream.ToArray(),
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            fileName);
    }

}