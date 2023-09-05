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
    public class ExamAnswerController : Controller
    {
        private readonly IExamAnswerRepository _examAnswerRepository;
        private readonly IExaminationRepository _examinationRepository;
        private readonly IQuestionRepository _questionRepository;
        private readonly IResultRepository _resultRepository;
        private readonly IMapper _mapper;

        public ExamAnswerController(IExamAnswerRepository examAnswerRepository, 
            IExaminationRepository examinationRepository, 
            IQuestionRepository questionRepository,
            IResultRepository resultRepository,
            IMapper mapper)
        {
            _examAnswerRepository = examAnswerRepository;
            _examinationRepository = examinationRepository;
            _questionRepository = questionRepository;
            _resultRepository = resultRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ExamAnswer>))]
        public IActionResult GetExamAnswers()
        {
            var examAnswers = _mapper.Map<List<ExamAnswerDto>>(_examAnswerRepository.GetExamAnswers());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(examAnswers);
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ExamAnswer))]
        [ProducesResponseType(400)]
        public IActionResult GetExamAnswer(int id)
        {
            if (!_examAnswerRepository.ExamAnswerExists(id))
            {
                return NotFound();
            }

            var examAnswer = _mapper.Map<ExamAnswerDto>(_examAnswerRepository.GetExamAnswer(id));

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(examAnswer);
        }

        [HttpGet("{examinationId}")]
        public IActionResult GetTotalCorrectAnswers(int examinationId)
        {
            var count = _examAnswerRepository.GetTotalCorrectAnswers(examinationId);
            return Ok(count);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateExamAnswer([FromBody] ExamAnswerDto examAnswerCreate)
        {
            if (examAnswerCreate == null)
            {
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var question = _questionRepository.GetQuestion(examAnswerCreate.QuestionID);
            if (question == null)
            {
                return BadRequest("Invalid Question ID");
            }

            bool isCorrect = (question.AnswerChoiceID == examAnswerCreate.ChoiceID);

            examAnswerCreate.IsCorrect = isCorrect;

            var examAnswerMap = _mapper.Map<ExamAnswer>(examAnswerCreate);

            if (!_examAnswerRepository.CreateExamAnswer(examAnswerMap))
            {
                ModelState.AddModelError("", "Something Went Wrong While Saving");
            }

            // Return a success response here if needed

            // Check if all ExamAnswers for the examination have been created
            var examination = _examinationRepository.GetExamination(examAnswerCreate.ExaminationID);
            var totalQuestions = _questionRepository.GetQuestionCount(examination.ModuleID);
            var totalExamAnswers = _examAnswerRepository.GetTotalExamAnswers(examAnswerCreate.ExaminationID);

            if (totalExamAnswers == totalQuestions)
            {
                // All ExamAnswers have been created, calculate TotalMark and create Result
                int totalCorrectAnswers = _examAnswerRepository.GetTotalCorrectAnswers(examAnswerCreate.ExaminationID);
                double percentage = (double)totalCorrectAnswers / totalQuestions * 100;

                var results = new ResultDto
                {
                    ExaminationID = examAnswerCreate.ExaminationID,
                    TotalMark = (int)percentage
                };

                var resultMap = _mapper.Map<Result>(results);

                if (!_resultRepository.CreateResult(resultMap))
                {
                    ModelState.AddModelError("", "Something Went Wrong While Saving Results");
                }
            }

            return Ok("Successfully Created");
        }



        [HttpPut("{examAnswerId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult UpdateExamAnswer(int examAnswerId, [FromBody] ExamAnswerDto updatedExamAnswer)
        {
            if (updatedExamAnswer == null)
            {
                return BadRequest(ModelState);
            }

            if (examAnswerId != updatedExamAnswer.ID)
            {
                return BadRequest(ModelState);
            }

            if (!_examAnswerRepository.ExamAnswerExists(examAnswerId))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var examAnswerMap = _mapper.Map<ExamAnswer>(updatedExamAnswer);

            if (!_examAnswerRepository.UpdateExamAnswer(examAnswerMap))
            {
                ModelState.AddModelError("", "Something Went Wrong Updating ExamAnswer");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully Updated");
        }

        [HttpDelete("{examAnswerId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteExamAnswer(int examAnswerId)
        {
            if (!_examAnswerRepository.ExamAnswerExists(examAnswerId))
            {
                return NotFound();
            }

            var examAnswerToDelete = _examAnswerRepository.GetExamAnswer(examAnswerId);

            if (!_examAnswerRepository.DeleteExamAnswer(examAnswerToDelete))
            {
                ModelState.AddModelError("", "Something Went Wrong Deleting ExamAnswern");
            }

            return Ok("Successfully Deleted");
        }
    }
}
