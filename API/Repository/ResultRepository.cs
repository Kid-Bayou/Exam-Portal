using AutoMapper;
using Exam_Portal.Data;
using Exam_Portal.Interfaces;
using Exam_Portal.Models;
using Microsoft.EntityFrameworkCore;

namespace Exam_Portal.Repository
{
    public class ResultRepository : IResultRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ResultRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public bool CreateResult(Result result)
        {
            _context.Add(result);
            return Save();
        }

        public bool DeleteResult(Result result)
        {
            _context.Remove(result);
            return Save();
        }

        public Result GetResult(int id)
        {
            return _context.Results.Where(m => m.ID == id).FirstOrDefault();
        }

        public Result GetExamResult(int eId)
        {
            return _context.Results.Where(r => r.ExaminationID == eId).FirstOrDefault();
        }

        public ICollection<Result> GetResults()
        {
            return _context.Results.ToList();
        }

        public bool ResultExists(int id)
        {
            return _context.Results.Any(r => r.ID == id);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateResult(Result result)
        {
            _context.Update(result);
            return Save();
        }
    }
}
