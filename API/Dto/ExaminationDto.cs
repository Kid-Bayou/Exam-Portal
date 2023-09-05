namespace Exam_Portal.Dto
{
    public class ExaminationDto
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public int ModuleID { get; set; }
        public string UserID { get; set; }
    }
}
