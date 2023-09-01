using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Exam_Portal.Migrations
{
    /// <inheritdoc />
    public partial class updatingStuff : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Examination_ExamTaker_ExamTakerID",
                table: "Examination");

            migrationBuilder.AddForeignKey(
                name: "FK_Examination_ExamTaker_ExamTakerID",
                table: "Examination",
                column: "ExamTakerID",
                principalTable: "ExamTaker",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Examination_ExamTaker_ExamTakerID",
                table: "Examination");

            migrationBuilder.AddForeignKey(
                name: "FK_Examination_ExamTaker_ExamTakerID",
                table: "Examination",
                column: "ExamTakerID",
                principalTable: "ExamTaker",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
