using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanceTracker_2._0.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedSeedData3cs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"),
                column: "PasswordHash",
                value: "AQAAAAIAAYagAAAAEPQomS+W3MP6Yse2HOKVnquyj3bDx9T7IItwFny/Je4mgNtxLp+esioG6IoBDa304g==");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"),
                column: "PasswordHash",
                value: "AQAAAAIAAYagAAAAEI5pV9oeLN1RqWxZROIoa9X4MqAbdL2Evg6NtU7jn2NQdKIpY6lueLHyJXAOKXMLjQ==");
        }
    }
}
