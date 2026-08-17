using GlobalMobility.Api.Data;
using GlobalMobility.Api.Entities;

namespace GlobalMobility.Api.Services;

public static class AdminSeeder
{
    public static async Task SeedAsync(
        ApplicationDbContext context)
    {
        if (context.Admins.Any())
        {
            return;
        }

        var admin = new Admin
        {
            Username = "admin",

            PasswordHash =
                BCrypt.Net.BCrypt.HashPassword("Admin@123")
        };

        context.Admins.Add(admin);

        await context.SaveChangesAsync();
    }
}