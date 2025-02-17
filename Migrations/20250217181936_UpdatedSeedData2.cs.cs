using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanceTracker_2._0.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedSeedData2cs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"),
                column: "PasswordHash",
                value: "AQAAAAIAAYagAAAAEI5pV9oeLN1RqWxZROIoa9X4MqAbdL2Evg6NtU7jn2NQdKIpY6lueLHyJXAOKXMLjQ==");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"),
                column: "PasswordHash",
                value: "AQAAAAEAACcQAAAAEJjgS/sdDU3F4vdkFtm5/+TMWq3v+8X5Fh+6D6SKNwj5uF2Qzy/mZoUo8s3/5Nd0FA==");
        }
    }
}
