using System.ComponentModel.DataAnnotations.Schema;

namespace Exam_Portal.Models
{
    public class Examination
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        [ForeignKey("Module")]
        public int ModuleID { get; set; }
        [ForeignKey("ExamTaker")]
        public int ExamTakerID { get; set; }
        public virtual ExamTaker ExamTaker { get; set; }
        public virtual Module Module { get; set; }
        public virtual Result Result { get; set; }



    }
}
