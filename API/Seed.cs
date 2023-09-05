using Exam_Portal.Data;
using Exam_Portal.Models;

namespace Exam_Portal
{
    public class Seed
    {
        private readonly DataContext context;

        public Seed(DataContext context)
        {
            this.context = context;
        }

        public void SeedDataContext()
        {
            context.Database.EnsureCreated();

            if (!context.Courses.Any())
            {

                var courses = new Course[]
                {
                new Course() {Title="Psychology", Description="All about the brain"},
                new Course() {Title="Design", Description="Design your heart out"}
                };
                context.Courses.AddRange(courses);
                context.SaveChanges();


                //////////////////////////////////////////////////////////////////////////////////


                //var examTakers = new ExamTaker[]
                //{
                //new ExamTaker() {Name="Abebs",},
                //new ExamTaker() { Name = "Kebebs", }
                //};
                //context.ExamTakers.AddRange(examTakers);
                //context.SaveChanges();


                /////////////////////////////////////////////////////////////////////////////////


                var modules = new Module[]
                {
                new Module() {Title="Set-I", Duration=120, PassingMark=75, CourseID=1},
                new Module() {Title = "Set-II", Duration=120, PassingMark=75, CourseID=2 }
                };
                context.Modules.AddRange(modules);
                context.SaveChanges();


                ////////////////////////////////////////////////////////////////////////////////////


                var questions = new Question[]
                {
                new Question() {QuestionContent="What is this?", Mark=1, ModuleID=1},
                new Question() {QuestionContent = "What is that?", Mark=1, ModuleID=1}
                };
                context.Questions.AddRange(questions);
                context.SaveChanges();


                ///////////////////////////////////////////////////////////////////////////////////


                var choices = new Choice[]
                {
                new Choice() {ChoiceContent="Its this", QuestionID=1},
                new Choice() {ChoiceContent="Its that", QuestionID=1}
                };
                context.Choices.AddRange(choices);
                context.SaveChanges();


                //////////////////////////////////////////////////////////////////////////////////////


                var examinations = new Examination[]
                {
                new Examination() {Title="This Persons Exam", StartDateTime=DateTime.Parse("09/14/2009 8:00"), EndDateTime=DateTime.Parse("09/14/2009 8:00"), ModuleID=1},
                new Examination() {Title="That Persons Exam", StartDateTime=DateTime.Parse("09/14/2009 8:00"), EndDateTime=DateTime.Parse("09/14/2009 8:00"), ModuleID=2}
                };
                context.Examinations.AddRange(examinations);
                context.SaveChanges();


                //////////////////////////////////////////////////////////////////////////////////


                var results = new Result[]
                {
                new Result() {ExaminationID=1, TotalMark=75},
                new Result() {ExaminationID=2, TotalMark=89}
                };
                context.Results.AddRange(results);
                context.SaveChanges();


                //////////////////////////////////////////////////////////////////////////////////////

                #region ExamAnswer
                var examAnswers = new ExamAnswer[]
                {
                new ExamAnswer() {ChoiceID=1, QuestionID=1, ExaminationID=1, IsCorrect=true},
                new ExamAnswer() {ChoiceID=1, QuestionID=2, ExaminationID=1, IsCorrect=true}
                };
                context.ExamAnswers.AddRange(examAnswers);
                context.SaveChanges();
                #endregion


                /////////////////////////////////////////////////////////////////////////////////

            }
        }
    }
}
