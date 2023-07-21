namespace Exam_Portal.Models
{
    public class Course
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public ICollection<Module> Modules { get; set; }
    }
}
