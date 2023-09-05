using AutoMapper;
using Exam_Portal.Data;
using Exam_Portal.Interfaces;
using Exam_Portal.Models;
using Microsoft.EntityFrameworkCore;

namespace Exam_Portal.Repository
{
    public class ExaminationRepository : IExaminationRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ExaminationRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public bool CreateExamination(Examination examination)
        {
            _context.Add(examination);
            return Save();
        }

        public bool DeleteExamination(Examination examination)
        {
            _context.Remove(examination);
            return Save();
        }

        public bool ExaminationExists(int id)
        {
            return _context.Examinations.Any(q => q.ID == id);
        }

        public Examination GetExamination(int id)
        {
            return _context.Examinations.Where(m => m.ID == id).FirstOrDefault();
        }

        public ICollection<Examination> GetExaminations()
        {
            return _context.Examinations.ToList();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateExamination(Examination examination)
        {
            _context.Update(examination);
            return Save();
        }

        public int GetExaminationCount()
        {
            return _context.Examinations.Count();
        }

        public Examination GetExamination(DateTime examStartDate, string examTakerId)
        {
            return _context.Examinations
                .FirstOrDefault(e => e.StartDateTime == examStartDate && e.UserID == examTakerId);

        }
    }
}
