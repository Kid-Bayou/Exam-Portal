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
    public class ResultController : Controller
    {
        private readonly IResultRepository _resultRepository;
        private readonly IExaminationRepository _examinationRepository;
        private readonly IExamAnswerRepository _examAnswerRepository;
        private readonly IMapper _mapper;

        public ResultController(IResultRepository ResultRepository,
            IModuleRepository moduleRepository,
            IExaminationRepository examinationRepository,
            IExamAnswerRepository examAnswerRepository,
            IMapper mapper)
        {
            _resultRepository = ResultRepository;
            _examinationRepository = examinationRepository;
            _examAnswerRepository = examAnswerRepository;
            _mapper = mapper;
        }
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Result>))]
        public IActionResult GetResults()
        {
            var Results = _mapper.Map<List<ResultDto>>(_resultRepository.GetResults());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(Results);
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(Result))]
        [ProducesResponseType(400)]
        public IActionResult GetResult(int id)
        {
            if (!_resultRepository.ResultExists(id))
            {
                return NotFound();
            }

            var Result = _mapper.Map<ResultDto>(_resultRepository.GetResult(id));

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(Result);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateResult([FromBody] ResultDto resultCreate)
        {
            if (resultCreate == null)
            {
                return BadRequest(ModelState);
            }

            var result = _resultRepository.GetResults()
                .Where(q => q.ID == resultCreate.ID)
                .FirstOrDefault();

            if (result != null)
            {
                ModelState.AddModelError("", "Result Already Exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var resultMap = _mapper.Map<Result>(resultCreate);


            if (!_resultRepository.CreateResult(resultMap))
            {
                ModelState.AddModelError("", "Something Went Wrong While Saving");
            }

            return Ok("Successfully Created");
        }

        [HttpPut("{resultId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult UpdateResult(int resultId, [FromBody] ResultDto updatedResult)
        {
            if (updatedResult == null)
            {
                return BadRequest(ModelState);
            }

            if (resultId != updatedResult.ID)
            {
                return BadRequest(ModelState);
            }

            if (!_resultRepository.ResultExists(resultId))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var resultMap = _mapper.Map<Result>(updatedResult);

            if (!_resultRepository.UpdateResult(resultMap))
            {
                ModelState.AddModelError("", "Something Went Wrong Updating Result");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully Updated");
        }

        [HttpDelete("{resultId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteResult(int resultId)
        {
            if (!_resultRepository.ResultExists(resultId))
            {
                return NotFound();
            }

            var resultToDelete = _resultRepository.GetResult(resultId);

            if (!_resultRepository.DeleteResult(resultToDelete))
            {
                ModelState.AddModelError("", "Something Went Wrong Deleting Resultn");
            }

            return Ok("Successfully Deleted");
        }
    }
}
