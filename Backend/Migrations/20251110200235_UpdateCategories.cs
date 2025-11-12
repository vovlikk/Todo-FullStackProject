using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TodoList_Fullstack.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "ToDoItems");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "ToDoItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CategoryName" },
                values: new object[,]
                {
                    { 1, "Work" },
                    { 2, "Personal" },
                    { 3, "Shopping" },
                    { 4, "Health" },
                    { 5, "Finance" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ToDoItems_CategoryId",
                table: "ToDoItems",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_ToDoItems_Categories_CategoryId",
                table: "ToDoItems",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDoItems_Categories_CategoryId",
                table: "ToDoItems");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_ToDoItems_CategoryId",
                table: "ToDoItems");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "ToDoItems");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "ToDoItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
