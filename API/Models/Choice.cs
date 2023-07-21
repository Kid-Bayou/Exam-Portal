using System.ComponentModel.DataAnnotations.Schema;

namespace Exam_Portal.Models
{
    public class Choice
    {
        public int ID { get; set; }
        [ForeignKey("Question")]
        public int QuestionID { get; set; }
        public string ChoiceContent { get; set; }
        public virtual Question Question { get; set; }
    }
}
