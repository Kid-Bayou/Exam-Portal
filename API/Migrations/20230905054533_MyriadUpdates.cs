using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Exam_Portal.Migrations
{
    /// <inheritdoc />
    public partial class MyriadUpdates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Examination_ExamTaker_ExamTakerID",
                table: "Examination");

            migrationBuilder.DropTable(
                name: "ExamTaker");

            migrationBuilder.DropIndex(
                name: "IX_Examination_ExamTakerID",
                table: "Examination");

            migrationBuilder.DropColumn(
                name: "ExamTakerID",
                table: "Examination");

            migrationBuilder.AddColumn<string>(
                name: "UserID",
                table: "Examination",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Examination_UserID",
                table: "Examination",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Examination_AspNetUsers_UserID",
                table: "Examination",
                column: "UserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Examination_AspNetUsers_UserID",
                table: "Examination");

            migrationBuilder.DropIndex(
                name: "IX_Examination_UserID",
                table: "Examination");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "Examination");

            migrationBuilder.AddColumn<int>(
                name: "ExamTakerID",
                table: "Examination",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ExamTaker",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExamTaker", x => x.ID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Examination_ExamTakerID",
                table: "Examination",
                column: "ExamTakerID");

            migrationBuilder.AddForeignKey(
                name: "FK_Examination_ExamTaker_ExamTakerID",
                table: "Examination",
                column: "ExamTakerID",
                principalTable: "ExamTaker",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
