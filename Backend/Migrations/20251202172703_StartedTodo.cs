using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoList_Fullstack.Migrations
{
    /// <inheritdoc />
    public partial class StartedTodo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsStart",
                table: "ToDoItems",
                newName: "IsStarted");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsStarted",
                table: "ToDoItems",
                newName: "IsStart");
        }
    }
}
