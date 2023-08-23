﻿using Exam_Portal.Models;
using Microsoft.AspNetCore.Identity;

namespace Exam_Portal.Interfaces
{
    public interface IAccountRepository
    {

        ICollection<User> GetUsers();
        Task<IdentityResult> SignUpAsync(SignUpModel signUpModel, bool isAdmin);
        Task<string> LoginAsync(SignInModel signInModel);
    }
}
