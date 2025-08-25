using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoList_Fullstack.Migrations
{
    /// <inheritdoc />
    public partial class SupportInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Supports");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Supports",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
