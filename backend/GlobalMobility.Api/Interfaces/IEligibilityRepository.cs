using GlobalMobility.Api.Entities;

namespace GlobalMobility.Api.Interfaces;

public interface IEligibilityRepository
{
    Task<CandidateEligibility> AddAsync(CandidateEligibility candidate);

    Task<List<CandidateEligibility>> GetAllAsync(
        string? name,
        string? phone,
        string? email,
        string? status);

    Task<bool> UpdateStatusAsync(int id, string status);

    Task<List<CandidateEligibility>> GetFilteredAsync(
    string? name,
    string? phone,
    string? email,
    string? status);
}