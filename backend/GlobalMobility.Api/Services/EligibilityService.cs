using GlobalMobility.Api.DTOs;
using GlobalMobility.Api.Entities;
using GlobalMobility.Api.Interfaces;

namespace GlobalMobility.Api.Services;

public class EligibilityService : IEligibilityService
{
    private readonly IEligibilityRepository _repository;

    public EligibilityService(IEligibilityRepository repository)
    {
        _repository = repository;
    }

    public async Task<CandidateEligibility> CreateAsync(CreateEligibilityRequestDto request)
    {
        var candidate = new CandidateEligibility
        {
            FullName = request.FullName,
            Age = request.Age,
            CountryPreference = request.CountryPreference,
            HighestEducation = request.HighestEducation,
            Occupation = request.Occupation,
            WorkExperience = request.WorkExperience,
            Email = request.Email,
            Phone = request.Phone,
            IeltsScore = request.IeltsScore,
            CreatedOn = DateTime.UtcNow
        };

        return await _repository.AddAsync(candidate);
    }
}