using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Exam_Portal.Migrations
{
    /// <inheritdoc />
    public partial class betterbeFinal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Course",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Course", x => x.ID);
                });

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

            migrationBuilder.CreateTable(
                name: "Module",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Duration = table.Column<int>(type: "int", nullable: false),
                    PassingMark = table.Column<int>(type: "int", nullable: false),
                    CourseID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Module", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Module_Course_CourseID",
                        column: x => x.CourseID,
                        principalTable: "Course",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Examination",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModuleID = table.Column<int>(type: "int", nullable: false),
                    ExamTakerID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Examination", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Examination_ExamTaker_ExamTakerID",
                        column: x => x.ExamTakerID,
                        principalTable: "ExamTaker",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Examination_Module_ModuleID",
                        column: x => x.ModuleID,
                        principalTable: "Module",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Question",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionContent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Mark = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ModuleID = table.Column<int>(type: "int", nullable: false),
                    AnswerChoiceID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Question", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Question_Module_ModuleID",
                        column: x => x.ModuleID,
                        principalTable: "Module",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Result",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExaminationID = table.Column<int>(type: "int", nullable: false),
                    TotalMark = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Result", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Result_Examination_ExaminationID",
                        column: x => x.ExaminationID,
                        principalTable: "Examination",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Choice",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionID = table.Column<int>(type: "int", nullable: false),
                    ChoiceContent = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Choice", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Choice_Question_QuestionID",
                        column: x => x.QuestionID,
                        principalTable: "Question",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExamAnswer",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExaminationID = table.Column<int>(type: "int", nullable: false),
                    QuestionID = table.Column<int>(type: "int", nullable: false),
                    ChoiceID = table.Column<int>(type: "int", nullable: false),
                    IsCorrect = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExamAnswer", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ExamAnswer_Examination_ExaminationID",
                        column: x => x.ExaminationID,
                        principalTable: "Examination",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExamAnswer_Question_QuestionID",
                        column: x => x.QuestionID,
                        principalTable: "Question",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Choice_QuestionID",
                table: "Choice",
                column: "QuestionID");

            migrationBuilder.CreateIndex(
                name: "IX_ExamAnswer_ExaminationID",
                table: "ExamAnswer",
                column: "ExaminationID");

            migrationBuilder.CreateIndex(
                name: "IX_ExamAnswer_QuestionID",
                table: "ExamAnswer",
                column: "QuestionID");

            migrationBuilder.CreateIndex(
                name: "IX_Examination_ExamTakerID",
                table: "Examination",
                column: "ExamTakerID");

            migrationBuilder.CreateIndex(
                name: "IX_Examination_ModuleID",
                table: "Examination",
                column: "ModuleID");

            migrationBuilder.CreateIndex(
                name: "IX_Module_CourseID",
                table: "Module",
                column: "CourseID");

            migrationBuilder.CreateIndex(
                name: "IX_Question_ModuleID",
                table: "Question",
                column: "ModuleID");

            migrationBuilder.CreateIndex(
                name: "IX_Result_ExaminationID",
                table: "Result",
                column: "ExaminationID",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Choice");

            migrationBuilder.DropTable(
                name: "ExamAnswer");

            migrationBuilder.DropTable(
                name: "Result");

            migrationBuilder.DropTable(
                name: "Question");

            migrationBuilder.DropTable(
                name: "Examination");

            migrationBuilder.DropTable(
                name: "ExamTaker");

            migrationBuilder.DropTable(
                name: "Module");

            migrationBuilder.DropTable(
                name: "Course");
        }
    }
}
