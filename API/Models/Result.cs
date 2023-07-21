using System.ComponentModel.DataAnnotations.Schema;

namespace Exam_Portal.Models
{
    public class Result
    {
        public int ID { get; set; }
        [ForeignKey("Examination")]
        public int ExaminationID { get; set; }
        public int TotalMark { get; set; }
        public Examination Examination { get; set; }
    }
}
