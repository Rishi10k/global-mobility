using GlobalMobility.Api.Data;
using GlobalMobility.Api.Entities;
using GlobalMobility.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

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

    public async Task<List<CandidateEligibility>> GetAllAsync(
        string? name,
        string? phone,
        string? email,
        string? status)
    {
        var query = _context.CandidateEligibilities
            .AsNoTracking()
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(name))
        {
            query = query.Where(x =>
                x.FullName.Contains(name));
        }

        if (!string.IsNullOrWhiteSpace(phone))
        {
            query = query.Where(x =>
                x.Phone.Contains(phone));
        }

        if (!string.IsNullOrWhiteSpace(email))
        {
            query = query.Where(x =>
                x.Email.Contains(email));
        }

        if (!string.IsNullOrWhiteSpace(status))
        {
            query = query.Where(x =>
                x.Status == status);
        }

        return await query
            .OrderByDescending(x => x.CreatedOn)
            .ToListAsync();
    }

    public async Task<bool> UpdateStatusAsync(
    int id,
    string status)
    {
        var record = await _context.CandidateEligibilities
            .FirstOrDefaultAsync(x => x.Id == id);

        if (record == null)
            return false;

        record.Status = status;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<List<CandidateEligibility>> GetFilteredAsync(
    string? name,
    string? phone,
    string? email,
    string? status)
    {
        var query = _context.CandidateEligibilities
            .AsNoTracking()
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(name))
        {
            query = query.Where(x =>
                x.FullName.Contains(name));
        }

        if (!string.IsNullOrWhiteSpace(phone))
        {
            query = query.Where(x =>
                x.Phone.Contains(phone));
        }

        if (!string.IsNullOrWhiteSpace(email))
        {
            query = query.Where(x =>
                x.Email.Contains(email));
        }

        if (!string.IsNullOrWhiteSpace(status))
        {
            query = query.Where(x =>
                x.Status == status);
        }

        return await query
            .OrderByDescending(x => x.CreatedOn)
            .ToListAsync();
    }
}