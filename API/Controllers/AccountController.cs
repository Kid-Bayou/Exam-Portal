using Exam_Portal.Dto;
using Exam_Portal.Interfaces;
using Exam_Portal.Models;
using Exam_Portal.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Exam_Portal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;

        public AccountController(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] SignUpModel signUpModel, [FromQuery] bool admin)
        {
            bool isAdmin = admin;
            var result = await _accountRepository.SignUpAsync(signUpModel, isAdmin);


            if (result.Succeeded)
            {
                return Ok(result.Succeeded);
            }

            return Unauthorized();
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<User>))]
        public IActionResult GetUsers()
        {
            var users = _accountRepository.GetUsers();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(users);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] SignInModel signInModel)
        {
            var result = await _accountRepository.LoginAsync(signInModel);

            if (string.IsNullOrEmpty(result))
            {
                return Unauthorized();
            }


            return Ok(result);
        }

        [HttpGet("role")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<User>))]
        public IActionResult GetUsersByRole(string roleName)
        {
            var users = _accountRepository.GetUsersByRole(roleName);

            if (users == null || users.Count == 0)
            {
                return NotFound();
            }

            return Ok(users);
        }

        [HttpGet("get-user-by-first-name/{firstName}")]
        [ProducesResponseType(200, Type = typeof(User))]
        public IActionResult GetUserByFirstName(string firstName)
        {
            var user = _accountRepository.GetUser(firstName);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet("admin-count")]
        [ProducesResponseType(200)]
        public IActionResult GetAdminCount()
        {
            var count = _accountRepository.GetAdminCount();
            return Ok(count);
        }

        [HttpGet("exam-taker-count")]
        [ProducesResponseType(200)]
        public IActionResult GetExamTakerCount()
        {
            var count = _accountRepository.GetExamTakerCount();
            return Ok(count);
        }

        [HttpGet("user-by-email")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(404)]
        public IActionResult GetUserByEmail([FromQuery] string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Email is required.");
            }

            var user = _accountRepository.GetUserByEmail(email);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(user);
        }




    }
}
