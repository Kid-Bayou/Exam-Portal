namespace Exam_Portal.Models
{
    public class ExamTaker
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Examination> Examinations { get; set; }

    }
}
