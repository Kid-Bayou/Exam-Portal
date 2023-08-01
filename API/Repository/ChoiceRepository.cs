using AutoMapper;
using Exam_Portal.Data;
using Exam_Portal.Interfaces;
using Exam_Portal.Models;

namespace Exam_Portal.Repository
{
    public class ChoiceRepository : IChoiceRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ChoiceRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public bool ChoiceExists(int id)
        {
            return _context.Choices.Any(c => c.ID == id);
        }

        public bool CreateChoice(Choice choice)
        {
            _context.Add(choice);
            return Save();
        }

        public bool DeleteChoice(Choice choice)
        {
            _context.Remove(choice);
            return Save();
        }

        public Choice GetChoice(int id)
        {
            return _context.Choices.Where(c => c.ID == id).FirstOrDefault();
        }

        public ICollection<Choice> GetChoices()
        {
            return _context.Choices.ToList();
        }

        public ICollection<Choice> GetQuestionChoices(int id)
        {
            return _context.Choices.Where(c => c.QuestionID == id).ToList();
        }

        public bool QuestionChoiceExists(int id)
        {
            return _context.Choices.Any(c => c.QuestionID == id);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateChoice(Choice choice)
        {
            _context.Update(choice);
            return Save();
        }
    }
}
