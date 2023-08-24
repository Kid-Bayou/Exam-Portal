using AutoMapper;
using Exam_Portal.Dto;
using Exam_Portal.Interfaces;
using Exam_Portal.Models;
using Exam_Portal.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Exam_Portal.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ChoiceController : Controller
    {
        private readonly IChoiceRepository _choiceRepository;
        private readonly IQuestionRepository _questionRepository;
        private readonly IMapper _mapper;

        public ChoiceController(IChoiceRepository choiceRepository, IQuestionRepository questionRepository, IMapper mapper)
        {
            _choiceRepository = choiceRepository;
            _questionRepository = questionRepository;
            _mapper = mapper;
        }
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Choice>))]
        public IActionResult GetChoices()
        {
            var choices = _mapper.Map<List<ChoiceDto>>(_choiceRepository.GetChoices());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(choices);
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Choice>))]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult GetQuestionChoices(int id)
        {
            if (!_choiceRepository.QuestionChoiceExists(id))
            {
                return NotFound();
            }

            var choices = _mapper.Map<List<ChoiceDto>>(_choiceRepository.GetQuestionChoices(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(choices);
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(Choice))]
        [ProducesResponseType(400)]
        public IActionResult GetChoice(int id)
        {
            if (!_choiceRepository.ChoiceExists(id))
            {
                return NotFound();
            }

            var choice = _mapper.Map<ChoiceDto>(_choiceRepository.GetChoice(id));

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(choice);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateChoice([FromBody] ChoiceDto choiceCreate)
        {
            if (choiceCreate == null)
            {
                return BadRequest(ModelState);
            }

            var choice = _choiceRepository.GetChoices()
                .Where(c => c.ChoiceContent.Trim().ToUpper() == choiceCreate.ChoiceContent.TrimEnd().ToUpper())
                .FirstOrDefault();

            if (choice != null)
            {
                ModelState.AddModelError("", "Choice Already Exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var choiceMap = _mapper.Map<Choice>(choiceCreate);


            if (!_choiceRepository.CreateChoice(choiceMap))
            {
                ModelState.AddModelError("", "Something Went Wrong While Saving");
            }

            return Ok("Successfully Created");
        }

        [HttpPut("{choiceId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult UpdateChoice(int choiceId, [FromBody] ChoiceDto updatedChoice)
        {
            if (updatedChoice == null)
            {
                return BadRequest(ModelState);
            }

            if (choiceId != updatedChoice.ID)
            {
                return BadRequest(ModelState);
            }

            if (!_choiceRepository.ChoiceExists(choiceId))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var choiceMap = _mapper.Map<Choice>(updatedChoice);

            if (!_choiceRepository.UpdateChoice(choiceMap))
            {
                ModelState.AddModelError("", "Something Went Wrong Updating Choice");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully Updated");
        }

        [HttpDelete("{choiceId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteChoice(int choiceId)
        {
            if (!_choiceRepository.ChoiceExists(choiceId))
            {
                return NotFound();
            }

            var choiceToDelete = _choiceRepository.GetChoice(choiceId);

            if(!_choiceRepository.DeleteChoice(choiceToDelete))
            {
                ModelState.AddModelError("", "Something Went Wrong Deleting ");
            }

            return Ok("Successfully Deleted");
        }
    }
}
