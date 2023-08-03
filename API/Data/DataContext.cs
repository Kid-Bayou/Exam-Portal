using Microsoft.EntityFrameworkCore;
using Exam_Portal.Models;
using Microsoft.Identity.Client;
using System.Collections;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Exam_Portal.Data
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { }
        public DbSet<Choice> Choices { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<ExamAnswer> ExamAnswers { get; set; }
        public DbSet<Examination> Examinations { get; set; }
        public DbSet<ExamTaker> ExamTakers { get; set; }
        public DbSet<Module> Modules { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Result> Results { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Choice>().ToTable("Choice");

            modelBuilder.Entity<Course>().ToTable("Course");

            modelBuilder.Entity<ExamAnswer>().ToTable("ExamAnswer");

            modelBuilder.Entity<Examination>().ToTable("Examination")
                .HasOne(r => r.Result)
                .WithOne(c => c.Examination)
                .HasForeignKey<Result>(k => k.ExaminationID);

            modelBuilder.Entity<ExamTaker>().ToTable("ExamTaker")
                .HasMany(e => e.Examinations)
                .WithOne(t => t.ExamTaker)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Module>().ToTable("Module")
                .HasMany(e => e.Examinations)
                .WithOne(m => m.Module)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Question>().ToTable("Question")
                .HasMany(r => r.ExamAnswers)
                .WithOne(c => c.Question)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<Result>().ToTable("Result");

            base.OnModelCreating(modelBuilder);
        }


    }
}
