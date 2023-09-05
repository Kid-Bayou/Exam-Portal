using AutoMapper;
using Exam_Portal.Data;
using Exam_Portal.Interfaces;
using Exam_Portal.Models;

namespace Exam_Portal.Repository
{
    public class ExamAnswerRepository : IExamAnswerRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ExamAnswerRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public bool CreateExamAnswer(ExamAnswer examAnswer)
        {
            _context.Add(examAnswer);
            return Save();
        }

        public bool DeleteExamAnswer(ExamAnswer examAnswer)
        {
            _context.Remove(examAnswer);
            return Save();
        }

        public bool ExamAnswerExists(int id)
        {
            return _context.ExamAnswers.Any(e => e.ID == id);
        }

        public ExamAnswer GetExamAnswer(int id)
        {
            return _context.ExamAnswers.Where(e => e.ID == id).FirstOrDefault();
        }

        public ICollection<ExamAnswer> GetExamAnswers()
        {
            return _context.ExamAnswers.ToList();
        }


        public int GetTotalCorrectAnswers(int examinationId)
        {
            return _context.ExamAnswers
        .Where(e => e.ExaminationID == examinationId && e.IsCorrect)
        .Count();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateExamAnswer(ExamAnswer examAnswer)
        {
            _context.Update(examAnswer);
            return Save();
        }

        public int GetTotalExamAnswers(int examinationId)
        {
            return _context.ExamAnswers.Count(ea => ea.ExaminationID == examinationId);
        }

    }
}
