using Exam_Portal.Models;
using Microsoft.EntityFrameworkCore.Storage;

namespace Exam_Portal.Interfaces
{
    public interface ICourseRepository
    {
        ICollection<Course> GetCourses();
        Course GetCourse(int id);
        Course GetCourse(string title);
        int GetCourseCount();
        bool CourseExists(int id);
        bool CourseExists(string title);
        bool CreateCourse(Course course);
        bool UpdateCourse(Course course);
        bool DeleteCourse(Course course);
        bool Save();
    }
}
