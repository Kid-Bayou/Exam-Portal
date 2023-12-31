﻿using Exam_Portal.Models;

namespace Exam_Portal.Interfaces
{
    public interface IQuestionRepository
    {
        ICollection<Question> GetQuestions();
        ICollection<Question> GetModuleQuestions(int id);
        Question GetQuestion(int id);
        int GetQuestionCount();
        int GetQuestionCount(int mId);
        bool QuestionExists(int id);

        bool ModuleQuestionExists(int id);
        bool CreateQuestion(Question question);
        bool UpdateQuestion(Question question);
        bool DeleteQuestion(Question question);
        bool Save();
    }
}
