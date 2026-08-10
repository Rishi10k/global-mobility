using System.Net;
using System.Net.Mail;

public interface IEmailService
{
    Task SendEligibilityConfirmationAsync(string userEmail, string fullName, string countryPreference);
}

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly IWebHostEnvironment _env;

    public EmailService(IConfiguration configuration, IWebHostEnvironment env)
    {
        _configuration = configuration;
        _env = env;
    }

    public async Task SendEligibilityConfirmationAsync(string userEmail, string fullName, string countryPreference)
    {
        var smtpServer = _configuration["EmailSettings:Server"];
        var port = int.Parse(_configuration["EmailSettings:Port"] ?? "587");
        var senderEmail = _configuration["EmailSettings:SenderEmail"];
        var senderName = _configuration["EmailSettings:SenderName"];
        var username = _configuration["EmailSettings:Username"];
        var password = _configuration["EmailSettings:Password"];

        // Load HTML template
        var templatePath = Path.Combine(_env.ContentRootPath, "Templates", "EligibilityEmail.html");
        var htmlTemplate = await File.ReadAllTextAsync(templatePath);

        // Replace placeholders
        var htmlBody = htmlTemplate
            .Replace("{FullName}", fullName)
            .Replace("{CountryPreference}", countryPreference)
            .Replace("{Email}", userEmail);

        var message = new MailMessage
        {
            From = new MailAddress(senderEmail!, senderName),
            Subject = "Your Eligibility Application Confirmation",
            Body = htmlBody,
            IsBodyHtml = true
        };
        message.To.Add(userEmail);

        using var client = new SmtpClient(smtpServer, port)
        {
            Credentials = new NetworkCredential(username, password),
            EnableSsl = true
        };

        await client.SendMailAsync(message);
    }
}