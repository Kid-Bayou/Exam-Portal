using Exam_Portal.Data;
using Exam_Portal.Interfaces;
using Exam_Portal.Models;
using Microsoft.EntityFrameworkCore;

namespace Exam_Portal.Repository
{
    public class ModuleRepository : IModuleRepository
    {
        private readonly DataContext _context;

        public ModuleRepository(DataContext context) 
        {
            _context = context;
        }
        public Module GetModule(int id)
        {
            return _context.Modules.Where(m => m.ID == id).FirstOrDefault(); 
        }

        public ICollection<Module> GetModules()
        {
            return _context.Modules.ToList();
        }

        public Module GetModule(string title)
        {
            return _context.Modules.Where(m => m.Title == title).FirstOrDefault();

        }

        public bool ModuleExists(int id)
        {
            return _context.Modules.Any(m => m.ID == id);
        }

        public bool ModuleExists(string title)
        {
            return _context.Modules.Any(m => m.Title == title);
        }

        public bool CreateModule(Module module)
        {
            _context.Add(module);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateModule(Module module)
        {
            _context.Update(module);
            return Save();
        }

        public bool DeleteModule(Module module)
        {
            _context.Remove(module);
            return Save();
        }
    }
}
