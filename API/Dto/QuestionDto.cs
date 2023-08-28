namespace Exam_Portal.Dto
{
    public class QuestionDto
    {
        public int ID { get; set; }
        public string QuestionContent { get; set; }
        public decimal Mark { get; set; }
        public int ModuleID { get; set; }
        public int AnswerChoiceID { get; set; }
    }
}
