using Exam_Portal.Models;

namespace Exam_Portal.Interfaces
{
    public interface IExaminationRepository
    {
        ICollection<Examination> GetExaminations();
        ICollection<Examination> GetUserExams(string uId);
        Examination GetExamination(int id);
        Examination GetExamination(DateTime examStartDate, string examTakerId);
        int GetExaminationCount();
        bool ExaminationExists(int id);
        bool CreateExamination(Examination examination);
        bool UpdateExamination(Examination examination);
        bool DeleteExamination(Examination examination);
        bool Save();
    }
}
