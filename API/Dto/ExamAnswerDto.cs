namespace Exam_Portal.Dto
{
    public class ExamAnswerDto
    {
        public int ID { get; set; }
        public int ExaminationID { get; set; }
        public int QuestionID { get; set; }
        public int ChoiceID { get; set; }
        public bool IsCorrect { get; set; }
    }
}
