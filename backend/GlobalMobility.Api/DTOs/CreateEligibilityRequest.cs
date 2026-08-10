namespace GlobalMobility.Api.DTOs;

public class CreateEligibilityRequest
{
    public string FullName { get; set; } = string.Empty;

    public int Age { get; set; }

    public string CountryPreference { get; set; } = string.Empty;

    public string HighestEducation { get; set; } = string.Empty;

    public string Occupation { get; set; } = string.Empty;

    public int WorkExperience { get; set; }

    public string Email { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string? IeltsScore { get; set; }
}