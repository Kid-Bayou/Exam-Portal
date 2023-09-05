//using Exam_Portal.Data;
//using Exam_Portal.Interfaces;
//using Exam_Portal.Models;

//namespace Exam_Portal.Repository
//{
//    public class ExamTakerRepository : IExamTakerRepository
//    {
//        private readonly DataContext _context;

//        public ExamTakerRepository(DataContext context)
//        {
//            _context = context;
//        }

//        public bool CreateExamTaker(ExamTaker examTaker)
//        {
//            _context.Add(examTaker);
//            return Save();
//        }

//        public bool DeleteExamTaker(ExamTaker examTaker)
//        {
//            _context.Remove(examTaker);
//            return Save();
//        }

//        public bool ExamTakerExists(int id)
//        {
//            return _context.ExamTakers.Any(m => m.ID == id);
//        }

//        public bool ExamTakerExists(string name)
//        {
//            return _context.ExamTakers.Any(m => m.Name == name);
//        }

//        public ExamTaker GetExamTaker(int id)
//        {
//            return _context.ExamTakers.Where(m => m.ID == id).FirstOrDefault();
//        }

//        public ExamTaker GetExamTaker(string name)
//        {
//            return _context.ExamTakers.Where(m => m.Name == name).FirstOrDefault();
//        }

//        public ICollection<ExamTaker> GetExamTakers()
//        {
//            return _context.ExamTakers.ToList();
//        }

//        public bool Save()
//        {
//             var saved = _context.SaveChanges();
//            return saved > 0 ? true : false;
//        }

//        public bool UpdateExamTaker(ExamTaker examTaker)
//        {
//            _context.Update(examTaker);
//            return Save();
//        }
//    }
//}
