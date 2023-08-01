using Exam_Portal.Models;

namespace Exam_Portal.Interfaces
{
    public interface IChoiceRepository
    {
        ICollection<Choice> GetChoices();
        ICollection<Choice> GetQuestionChoices(int id);
        Choice GetChoice(int id);
        bool ChoiceExists(int id);
        bool QuestionChoiceExists(int id);
        bool CreateChoice(Choice choice);
        bool UpdateChoice(Choice choice);
        bool DeleteChoice(Choice choice);
        bool Save();
    }
}
