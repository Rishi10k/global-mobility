using GlobalMobility.Api.Data;
using GlobalMobility.Api.Entities;
using GlobalMobility.Api.Interfaces;

namespace GlobalMobility.Api.Repositories;

public class EligibilityRepository : IEligibilityRepository
{
    private readonly ApplicationDbContext _context;

    public EligibilityRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<CandidateEligibility> AddAsync(CandidateEligibility candidate)
    {
        _context.CandidateEligibilities.Add(candidate);

        await _context.SaveChangesAsync();

        return candidate;
    }
}