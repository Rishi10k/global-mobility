using GlobalMobility.Api.Entities;

namespace GlobalMobility.Api.Interfaces;

public interface IEligibilityRepository
{
    Task<CandidateEligibility> AddAsync(CandidateEligibility candidate);
}