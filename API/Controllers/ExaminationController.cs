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
    public class ExaminationController : Controller
    {
        private readonly IExaminationRepository _examinationRepository;
        private readonly IModuleRepository _moduleRepository;
        private readonly ICourseRepository _courseRepository;
        private readonly IExamTakerRepository _examTakerRepository;
        private readonly IResultRepository _resultRepository;
        private readonly IMapper _mapper;

        public ExaminationController(IExaminationRepository ExaminationRepository, 
            IModuleRepository moduleRepository, 
            ICourseRepository courseRepository,
            IExamTakerRepository examTakerRepository,
            IResultRepository resultRepository,
            IMapper mapper)
        {
            _examinationRepository = ExaminationRepository;
            _moduleRepository = moduleRepository;
            _courseRepository = courseRepository;
            _examTakerRepository = examTakerRepository;
            _resultRepository = resultRepository;
            _mapper = mapper;
        }
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Examination>))]
        public IActionResult GetExaminations()
        {
            var examinations = _mapper.Map<List<ExaminationDto>>(_examinationRepository.GetExaminations());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(examinations);
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(Examination))]
        [ProducesResponseType(400)]
        public IActionResult GetExamination(int id)
        {
            if (!_examinationRepository.ExaminationExists(id))
            {
                return NotFound();
            }

            var examination = _mapper.Map<ExaminationDto>(_examinationRepository.GetExamination(id));

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(examination);
        }

        [HttpGet]
        [ProducesResponseType(200)]
        public IActionResult GetExaminationCount()
        {
            var count = _examinationRepository.GetExaminationCount();
            return Ok(count);
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(Examination))]
        [ProducesResponseType(400)]
        public IActionResult GetExaminationByStartDateAndTakerId(DateTime examStartDate, string examTakerId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var examination = _examinationRepository.GetExamination(examStartDate, examTakerId);

            if (examination == null)
            {
                return NotFound();
            }

            var examinationDto = _mapper.Map<ExaminationDto>(examination);
            return Ok(examinationDto);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateExamination([FromBody] ExaminationDto examinationCreate)
        {
            if (examinationCreate == null)
            {
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var examinationMap = _mapper.Map<Examination>(examinationCreate);


            if (!_examinationRepository.CreateExamination(examinationMap))
            {
                ModelState.AddModelError("", "Something Went Wrong While Saving");
            }

            return Ok("Successfully Created");
        }

        [HttpPut("{examinationId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult UpdateExamination(int examinationId, [FromBody] ExaminationDto updatedExamination)
        {
            if (updatedExamination == null)
            {
                return BadRequest(ModelState);
            }

            if (examinationId != updatedExamination.ID)
            {
                return BadRequest(ModelState);
            }

            if (!_examinationRepository.ExaminationExists(examinationId))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var examinationMap = _mapper.Map<Examination>(updatedExamination);

            if (!_examinationRepository.UpdateExamination(examinationMap))
            {
                ModelState.AddModelError("", "Something Went Wrong Updating Examination");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully Updated");
        }

        [HttpDelete("{examinationId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteExamination(int examinationId)
        {
            if (!_examinationRepository.ExaminationExists(examinationId))
            {
                return NotFound();
            }

            var ExaminationToDelete = _examinationRepository.GetExamination(examinationId);

            if (!_examinationRepository.DeleteExamination(ExaminationToDelete))
            {
                ModelState.AddModelError("", "Something Went Wrong Deleting Examinationn");
            }

            return Ok("Successfully Deleted");
        }
    }
}
