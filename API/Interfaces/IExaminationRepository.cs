using Exam_Portal.Models;

namespace Exam_Portal.Interfaces
{
    public interface IExaminationRepository
    {
        ICollection<Examination> GetExaminations();
        Examination GetExamination(int id);
        int GetExaminationCount();
        bool ExaminationExists(int id);
        bool CreateExamination(Examination examination);
        bool UpdateExamination(Examination examination);
        bool DeleteExamination(Examination examination);
        bool Save();
    }
}
