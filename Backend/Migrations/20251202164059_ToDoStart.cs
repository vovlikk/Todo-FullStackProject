using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoList_Fullstack.Migrations
{
    /// <inheritdoc />
    public partial class ToDoStart : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsStart",
                table: "ToDoItems",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsStart",
                table: "ToDoItems");
        }
    }
}
