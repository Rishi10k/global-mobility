using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GlobalMobility.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddEligibilityStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "CandidateEligibilities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "CandidateEligibilities");
        }
    }
}
