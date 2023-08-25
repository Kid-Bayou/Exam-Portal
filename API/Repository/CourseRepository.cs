using Exam_Portal.Data;
using Exam_Portal.Interfaces;
using Exam_Portal.Models;

namespace Exam_Portal.Repository
{
    public class CourseRepository : ICourseRepository
    {
        private readonly DataContext _context;
        public CourseRepository(DataContext context)
        {
            _context = context;
        }

        public Course GetCourse(int id)
        {
            return _context.Courses.Where(c => c.ID == id).FirstOrDefault();
        }

        public Course GetCourse(string title)
        {
            return _context.Courses.Where(c => c.Title == title).FirstOrDefault();
        }

        public ICollection<Course> GetCourses()
        {
            return _context.Courses.OrderBy(c => c.ID).ToList();
        }

        public bool CourseExists(int id)
        {
            return _context.Courses.Any(c => c.ID == id);
        }

        public bool CourseExists(string title)
        {
            return _context.Courses.Any(c => c.Title == title);
        }

        public bool CreateCourse(Course course)
        {
            _context.Add(course);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateCourse(Course course)
        {
            _context.Update(course);
            return Save();
        }

        public bool DeleteCourse(Course course)
        {
            _context.Remove(course);
            return Save();
        }

        public int GetCourseCount()
        {
            return _context.Courses.Count();
        }

    }
}
