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
    public class QuestionController : Controller
    {
        private readonly IQuestionRepository _questionRepository;
        private readonly IModuleRepository _moduleRepository;
        private readonly IMapper _mapper;

        public QuestionController(IQuestionRepository questionRepository, IModuleRepository moduleRepository, IMapper mapper)
        {
            _questionRepository = questionRepository;
            _moduleRepository = moduleRepository;
            _mapper = mapper;
        }
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Question>))]
        public IActionResult GetQuestions()
        {
            var questions = _mapper.Map<List<QuestionDto>>(_questionRepository.GetQuestions());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(questions);
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(Question))]
        [ProducesResponseType(400)]
        public IActionResult GetQuestion(int id)
        {
            if (!_questionRepository.QuestionExists(id))
            {
                return NotFound();
            }

            var question = _mapper.Map<QuestionDto>(_questionRepository.GetQuestion(id));

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(question);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateQuestion([FromQuery] int mId, [FromBody] QuestionDto questionCreate)
        {
            if (questionCreate == null)
            {
                return BadRequest(ModelState);
            }

            var question = _questionRepository.GetQuestions()
                .Where(q => q.QuestionContent.Trim().ToUpper() == questionCreate.QuestionContent.TrimEnd().ToUpper())
                .FirstOrDefault();

            if (question != null)
            {
                ModelState.AddModelError("", "Question Already Exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var questionMap = _mapper.Map<Question>(questionCreate);

            questionMap.Module = _moduleRepository.GetModule(mId);

            if (!_questionRepository.CreateQuestion(questionMap))
            {
                ModelState.AddModelError("", "Something Went Wrong While Saving");
            }

            return Ok("Successfully Created");
        }

        [HttpPut("{questionId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult UpdateQuestion(int questionId, [FromBody] QuestionDto updatedQuestion)
        {
            if (updatedQuestion == null)
            {
                return BadRequest(ModelState);
            }

            if (questionId != updatedQuestion.ID)
            {
                return BadRequest(ModelState);
            }

            if (!_questionRepository.QuestionExists(questionId))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var questionMap = _mapper.Map<Question>(updatedQuestion);

            if (!_questionRepository.UpdateQuestion(questionMap))
            {
                ModelState.AddModelError("", "Something Went Wrong Updating Question");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully Updated");
        }

        [HttpDelete("{questionId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteQuestion(int questionId)
        {
            if (!_questionRepository.QuestionExists(questionId))
            {
                return NotFound();
            }

            var questionToDelete = _questionRepository.GetQuestion(questionId);

            if (!_questionRepository.DeleteQuestion(questionToDelete))
            {
                ModelState.AddModelError("", "Something Went Wrong Deleting Questionn");
            }

            return Ok("Successfully Deleted");
        }
    }
}
