using GlobalMobility.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace GlobalMobility.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<CandidateEligibility> CandidateEligibilities { get; set; }
    public DbSet<Admin> Admins { get; set; }
}