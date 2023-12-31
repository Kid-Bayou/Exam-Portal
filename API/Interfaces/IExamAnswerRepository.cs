﻿using Exam_Portal.Models;

namespace Exam_Portal.Interfaces
{
    public interface IExamAnswerRepository
    {
        ICollection<ExamAnswer> GetExamAnswers();
        ExamAnswer GetExamAnswer(int id);
        int GetTotalCorrectAnswers(int examinationId);
        bool ExamAnswerExists(int id);
        bool CreateExamAnswer(ExamAnswer examAnswer);
        bool UpdateExamAnswer(ExamAnswer examAnswer);
        bool DeleteExamAnswer(ExamAnswer examAnswer);
        int GetTotalExamAnswers(int examinationId);
        bool Save();
    }
}
