using AutoMapper;
using Exam_Portal.Data;
using Exam_Portal.Interfaces;
using Exam_Portal.Models;
using Microsoft.EntityFrameworkCore;

namespace Exam_Portal.Repository
{
    public class QuestionRepository : IQuestionRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public QuestionRepository(DataContext context, IMapper mapper) 
        {
            _context = context;
            _mapper = mapper;
        }

        public bool CreateQuestion(Question question)
        {
            _context.Add(question);
            return Save();
        }

        public bool DeleteQuestion(Question question)
        {
            _context.Remove(question);
            return Save();
        }

        public Question GetQuestion(int id)
        {
            return _context.Questions.Where(m => m.ID == id).FirstOrDefault();
        }

        public ICollection<Question> GetQuestions()
        {
            return _context.Questions.ToList();
        }

        public bool QuestionExists(int id)
        {
            return _context.Questions.Any(q => q.ID == id);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateQuestion(Question question)
        {
            _context.Update(question);
            return Save();
        }
    }
}
