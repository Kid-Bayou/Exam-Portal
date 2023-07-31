using Exam_Portal.Models;
using System.ComponentModel;

namespace Exam_Portal.Interfaces
{
    public interface IModuleRepository
    {
        ICollection<Module> GetModules();
        ICollection<Module> GetModules(int id);
        Module GetModule(int id);
        Module GetModule(string title);
        bool ModuleExists(int id);
        bool ModuleExists(string title);
        bool CreateModule(Module module);
        bool UpdateModule(Module module);
        bool DeleteModule(Module module);
        bool Save();

    }
}
