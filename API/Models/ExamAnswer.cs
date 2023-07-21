using System.ComponentModel.DataAnnotations.Schema;

namespace Exam_Portal.Models
{
    public class ExamAnswer
    {
        public int ID { get; set; }
        [ForeignKey("Examination")]
        public int ExaminationID { get; set; }
        [ForeignKey("Question")]
        public int QuestionID { get; set; }
        [ForeignKey("Choice")]
        public int ChoiceID { get; set; }
        public bool IsCorrect { get; set; }
        public virtual Examination Examination { get; set; }
        public virtual Question Question { get; set; }
    }
}
