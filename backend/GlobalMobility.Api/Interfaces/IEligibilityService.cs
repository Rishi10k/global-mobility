using GlobalMobility.Api.DTOs;
using GlobalMobility.Api.Entities;

namespace GlobalMobility.Api.Interfaces;

public interface IEligibilityService
{
    Task<CandidateEligibility> CreateAsync(CreateEligibilityRequest request);
}