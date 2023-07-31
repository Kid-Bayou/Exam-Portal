import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { get } from "../../service/APIService";
import { ExamContext } from "../../Context/ExamContext";

function CourseList() {
  const { course, setCourse } = useContext(ExamContext);

  const courseElements = course.map((course) => (
    <div key={course.id} className="course-tile">
      <Link to={`/courses/${course.id}`}>
        <div className="course-info">
          <h3 className="course-info-text">{course.title}</h3>
        </div>
      </Link>
    </div>
  ));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await get(
          "https://localhost:7182/api/Course/GetCourses"
        );
        setCourse(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="course-list-container">
        <h2 className="course-header">Courses</h2>
        <div className="course-list">{courseElements}</div>
      </div>
      <div className="create-course-container">
        <Link to="/courses/createcourse">
          <button className="button">Create Course</button>
        </Link>
      </div>
    </>
  );
}

export default CourseList;
