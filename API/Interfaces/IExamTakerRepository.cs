using Exam_Portal.Models;

namespace Exam_Portal.Interfaces
{
    public interface IExamTakerRepository
    {
        ICollection<ExamTaker> GetExamTakers();
        ExamTaker GetExamTaker(int id);
        ExamTaker GetExamTaker(string name);
        bool ExamTakerExists(int id);
        bool ExamTakerExists(string name);
        bool CreateExamTaker(ExamTaker examTaker);
        bool UpdateExamTaker(ExamTaker examTaker);
        bool DeleteExamTaker (ExamTaker examTaker);

        bool Save();
    }
}
