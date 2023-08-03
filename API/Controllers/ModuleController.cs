using AutoMapper;
using Exam_Portal.Dto;
using Exam_Portal.Interfaces;
using Exam_Portal.Models;
using Exam_Portal.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Exam_Portal.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ModuleController : Controller
    {
        private readonly IModuleRepository _moduleRepository;
        private readonly ICourseRepository _courseRepository;
        private readonly IMapper _mapper; 

        public ModuleController(IModuleRepository moduleRepository, ICourseRepository courseRepository, IMapper mapper)
        {
            _moduleRepository = moduleRepository;
            _courseRepository = courseRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Module>))]
        public IActionResult GetModules()
        {
            var modules = _mapper.Map<List<ModuleDto>>(_moduleRepository.GetModules());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(modules);
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Module>))]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult GetCourseModules(int id)
        {
            if (!_moduleRepository.CourseModuleExists(id))
            {
                return NotFound();
            }

            var modules = _mapper.Map<List<ModuleDto>>(_moduleRepository.GetCourseModules(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(modules);
        }


        [HttpGet]
        [ProducesResponseType(200, Type = typeof(Module))]
        [ProducesResponseType(400)]
        public IActionResult GetModule(int id)
        {
            if (!_moduleRepository.ModuleExists(id))
            {
                return NotFound();
            }

            var module = _mapper.Map<ModuleDto>(_moduleRepository.GetModule(id));

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(module);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateModule([FromQuery] int cId, [FromBody] ModuleDto moduleCreate)
        {
            if (moduleCreate == null)
            {
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var moduleMap = _mapper.Map<Module>(moduleCreate);

            moduleMap.Course = _courseRepository.GetCourse(cId);

            if (!_moduleRepository.CreateModule(moduleMap))
            {
                ModelState.AddModelError("", "Something Went Wrong While Saving");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully Created");
        }

        [HttpPut("{moduleId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult UpdateModule(int moduleId, [FromBody] ModuleDto updatedModule)
        {
            if (updatedModule == null)
            {
                return BadRequest(ModelState);
            }

            if (moduleId != updatedModule.ID)
            {
                return BadRequest(ModelState);
            }

            if (!_moduleRepository.ModuleExists(moduleId))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var moduleMap = _mapper.Map<Module>(updatedModule);

            if (!_moduleRepository.UpdateModule(moduleMap))
            {
                ModelState.AddModelError("", "Something Went Wrong Updating Module");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully Updated");
        }

        [HttpDelete("{moduleId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteModule(int moduleId)
        {
            if (!_moduleRepository.ModuleExists(moduleId))
            {
                return NotFound();
            }

            var moduleToDelete = _moduleRepository.GetModule(moduleId);

            if (!_moduleRepository.DeleteModule(moduleToDelete))
            {
                ModelState.AddModelError("", "Something Went Wrong Deleting Category");
            }

            return Ok("Successfully Deleted");
        }
    }
}
