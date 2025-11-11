using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoList_Fullstack.Migrations
{
    /// <inheritdoc />
    public partial class UpdateToDo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CompletedAt",
                table: "ToDoItems",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Deadline",
                table: "ToDoItems",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompletedAt",
                table: "ToDoItems");

            migrationBuilder.DropColumn(
                name: "Deadline",
                table: "ToDoItems");
        }
    }
}
