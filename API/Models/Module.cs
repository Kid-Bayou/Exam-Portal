using System.ComponentModel.DataAnnotations.Schema;

namespace Exam_Portal.Models
{
    public class Module
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public int Duration { get; set; }
        public int PassingMark { get; set; }
        [ForeignKey("Course")]
        public int CourseID { get; set; }
        public virtual Course Course { get; set; }
        public virtual ICollection<Question> Questions { get; set; }
        public virtual ICollection<Examination> Examinations { get; set; }
         
       
    }
}
