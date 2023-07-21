namespace Exam_Portal.Dto
{
    public class ModuleDto
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public int Duration { get; set; }
        public int PassingMark { get; set; }

        public int CourseID { get; set; }
    }
}
