﻿using AutoMapper;
using Exam_Portal.Dto;
using Exam_Portal.Interfaces;
using Exam_Portal.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Exam_Portal.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CourseController : Controller
    {
        private readonly ICourseRepository _courseRepository;
        private readonly IMapper _mapper;

        public CourseController(ICourseRepository courseRepository, IMapper mapper)
        {
            _courseRepository = courseRepository;
            _mapper = mapper;
        }
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Course>))]
        public IActionResult GetCourses()
        {
            var courses = _mapper.Map<List<CourseDto>>(_courseRepository.GetCourses());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(courses);
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(Course))]
        [ProducesResponseType(400)]
        public IActionResult GetCourse(string title)
        {
            if (!_courseRepository.CourseExists(title))
            {
                return NotFound();
            }

            var course = _mapper.Map<CourseDto>(_courseRepository.GetCourse(title));

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(course);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateCourse([FromBody] CourseDto courseCreate)
        {
            if(courseCreate == null)
            {
                return BadRequest(ModelState);
            }

            var course = _courseRepository.GetCourses()
                .Where(c => c.Title.Trim().ToUpper() == courseCreate.Title.TrimEnd().ToUpper())
                .FirstOrDefault();

            if(course != null)
            {
                ModelState.AddModelError("", "Course Already Exists");
                return StatusCode(422, ModelState);
            }

            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var courseMap = _mapper.Map<Course>(courseCreate);

            if (!_courseRepository.CreateCourse(courseMap))
            {
                ModelState.AddModelError("", "Something Went Wrong While Saving");
            }

            return Ok("Successfully Created");
        }

        [HttpPut("{courseId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult UpdateCourse(int courseId, [FromBody] CourseDto updatedCourse)
        {
            if(updatedCourse == null)
            {
                return BadRequest(ModelState);
            }

            if (courseId != updatedCourse.ID)
            {
                return BadRequest(ModelState);
            }

            if (!_courseRepository.CourseExists(courseId))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var courseMap = _mapper.Map<Course>(updatedCourse);

            if (!_courseRepository.UpdateCourse(courseMap))
            {
                ModelState.AddModelError("", "Something Went Wrong Updating Course");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully Updated");
        }

        [HttpDelete("{courseId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteCourse(int courseId)
        {
            if (!_courseRepository.CourseExists(courseId))
            {
                return NotFound();
            }

            var courseToDelete = _courseRepository.GetCourse(courseId);

            if (!_courseRepository.DeleteCourse(courseToDelete))
            {
                ModelState.AddModelError("", "Something Went Wrong Deleting Course");
            }

            return Ok("Successfully Deleted");
        }

    }
}
