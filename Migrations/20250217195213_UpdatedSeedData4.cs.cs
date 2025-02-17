using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanceTracker_2._0.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedSeedData4cs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName", "firstName", "lastName" },
                values: new object[] { new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"), 0, "CONCURRENCY-SECONDUSER-STATIC", "seconduser@example.com", true, false, null, "SECONDUSER@EXAMPLE.COM", "SECONDUSER", "AQAAAAIAAYagAAAAEFG9EGclYxL6nymYOIfwioOhO4NUf8mO3Vt0u6/533pjK4TaGi3d4BhY6CLK/kKjwQ==", null, false, "B1B2B3B4-B5B6-B7B8-B9B0-CCCCCCCCCCCC", false, "seconduser", "Jane", "Doe" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"));
        }
    }
}
