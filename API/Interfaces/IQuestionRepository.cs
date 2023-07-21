using Exam_Portal.Models;

namespace Exam_Portal.Interfaces
{
    public interface IQuestionRepository
    {
        ICollection<Question> GetQuestions();
        Question GetQuestion(int id);
        bool QuestionExists(int id);
        bool CreateQuestion(Question question);
        bool UpdateQuestion(Question question);
        bool DeleteQuestion(Question question);
        bool Save();
    }
}
