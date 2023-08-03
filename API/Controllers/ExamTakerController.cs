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
    public class ExamTakerController : Controller
    {
        private readonly IExamTakerRepository _examTakerRepository;
        private readonly IMapper _mapper;

        public ExamTakerController(IExamTakerRepository examTakerRepository, IMapper mapper)
        {
            _examTakerRepository = examTakerRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ExamTaker>))]
        public IActionResult GetExamTakers()
        {
            var examTakers = _mapper.Map<List<ExamTakerDto>>(_examTakerRepository.GetExamTakers());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(examTakers);
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ExamTaker))]
        [ProducesResponseType(400)]
        public IActionResult GetExamTaker(string name)
        {
            if (!_examTakerRepository.ExamTakerExists(name))
            {
                return NotFound();
            }

            var examTaker = _mapper.Map<ExamTakerDto>(_examTakerRepository.GetExamTaker(name));

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(examTaker);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateExamTaker([FromBody] ExamTakerDto examTakerCreate)
        {
            if (examTakerCreate == null)
            {
                return BadRequest(ModelState);
            }

            var examTaker = _examTakerRepository.GetExamTakers()
                .Where(c => c.Name.Trim().ToUpper() == examTakerCreate.Name.TrimEnd().ToUpper())
                .FirstOrDefault();

            if (examTaker != null)
            {
                ModelState.AddModelError("", "Exam Taker Already Exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var examTakerMap = _mapper.Map<ExamTaker>(examTakerCreate);

            if (!_examTakerRepository.CreateExamTaker(examTakerMap))
            {
                ModelState.AddModelError("", "Something Went Wrong While Saving");
            }

            return Ok("Successfully Created");
        }

        [HttpPut("{examTakerId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult UpdateExamTaker(int examTakerId, [FromBody] ExamTakerDto updatedExamTaker)
        {
            if (updatedExamTaker == null)
            {
                return BadRequest(ModelState);
            }

            if (examTakerId != updatedExamTaker.ID)
            {
                return BadRequest(ModelState);
            }

            if (!_examTakerRepository.ExamTakerExists(examTakerId))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var examTakerMap = _mapper.Map<ExamTaker>(updatedExamTaker);

            if (!_examTakerRepository.UpdateExamTaker(examTakerMap))
            {
                ModelState.AddModelError("", "Something Went Wrong Updating ExamTaker");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully Updated");
        }

        [HttpDelete("{examTakerId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteExamTaker(int examTakerId)
        {
            if (!_examTakerRepository.ExamTakerExists(examTakerId))
            {
                return NotFound();
            }

            var examTakerToDelete = _examTakerRepository.GetExamTaker(examTakerId);

            if (!_examTakerRepository.DeleteExamTaker(examTakerToDelete))
            {
                ModelState.AddModelError("", "Something Went Wrong Deleting Category");
            }

            return Ok("Successfully Deleted");
        }
    }
}
