using Microsoft.AspNetCore.Identity;

namespace Exam_Portal.Models
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
