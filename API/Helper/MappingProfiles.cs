using AutoMapper;
using Exam_Portal.Dto;
using Exam_Portal.Models;

namespace Exam_Portal.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Course, CourseDto>();
            CreateMap<CourseDto, Course>();

            CreateMap<Module, ModuleDto>();
            CreateMap<ModuleDto, Module>();

            CreateMap<Question, QuestionDto>();
            CreateMap<QuestionDto, Question>();

            CreateMap<Choice, ChoiceDto>();
            CreateMap<ChoiceDto, Choice>();

            CreateMap<Examination, ExaminationDto>();
            CreateMap<ExaminationDto, Examination>();

            CreateMap<ExamAnswer, ExamAnswerDto>();
            CreateMap<ExamAnswerDto,  ExamAnswer>();

            CreateMap<Result, ResultDto>();
            CreateMap<ResultDto, Result>();

        }
    }
}
