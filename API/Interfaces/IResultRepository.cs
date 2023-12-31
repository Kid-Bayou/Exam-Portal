﻿using Exam_Portal.Dto;
using Exam_Portal.Models;

namespace Exam_Portal.Interfaces
{
    public interface IResultRepository
    {
        ICollection<Result> GetResults();
        Result GetResult(int id);
        Result GetExamResult(int eId);
        bool ResultExists(int id);
        bool CreateResult(Result result);
        bool UpdateResult(Result result);
        bool DeleteResult(Result result);
        bool Save();
    }
}
