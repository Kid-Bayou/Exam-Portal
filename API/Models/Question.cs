using System.ComponentModel.DataAnnotations.Schema;

namespace Exam_Portal.Models
{
    public class Question
    {
        public int ID { get; set; }
        public string QuestionContent { get; set; }
        public decimal Mark { get; set; }
        [ForeignKey("Module")]
        public int ModuleID { get; set; }
        public int AnswerChoiceID { get; set; }
        public virtual Module Module { get; set; }
        public virtual ICollection<Choice> Choices { get; set; }
        public virtual ICollection<ExamAnswer> ExamAnswers { get; set; }
    }
}
