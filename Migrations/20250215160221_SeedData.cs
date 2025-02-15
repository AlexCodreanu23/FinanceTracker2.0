using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanceTracker_2._0.Migrations
{
    /// <inheritdoc />
    public partial class SeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "createdAt",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETUTCDATE()",
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName", "firstName", "lastName" },
                values: new object[] { new Guid("22222222-2222-2222-2222-222222222222"), 0, "STATIC_CONCURRENCY_STAMP_VALUE", "testuser@example.com", true, false, null, "TESTUSER@EXAMPLE.COM", "TESTUSER", "AQAAAAEAACcQAAAAEJjgS/sdDU3F4vdkFtm5/+TMWq3v+8X5Fh+6D6SKNwj5uF2Qzy/mZoUo8s3/5Nd0FA==", null, false, "C1A3E9E3-1234-5678-90AB-CDEF12345678", false, "testuser", "John", "Boss" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "name" },
                values: new object[] { new Guid("33333333-3333-3333-3333-333333333333"), "Categorie Exemplu" });

            migrationBuilder.InsertData(
                table: "Accounts",
                columns: new[] { "Id", "UserId", "balance", "currency", "name" },
                values: new object[] { new Guid("11111111-1111-1111-1111-111111111111"), new Guid("22222222-2222-2222-2222-222222222222"), 1000m, "RON", "Cont Principal" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"));

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333333"));

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"));

            migrationBuilder.AlterColumn<DateTime>(
                name: "createdAt",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValueSql: "GETUTCDATE()");
        }
    }
}
