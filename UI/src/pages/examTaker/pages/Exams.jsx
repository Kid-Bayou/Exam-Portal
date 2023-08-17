import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import { API_BASE_URL, get } from "../../../service/APIService";

import "./Pages.css"

function CourseExam() {
    
  const [course, setCourse] = useState([]);

  const courseElements = course.map((course) => (
    <div key={course.id} className="exam-course-tile">
      <Link to={`/userdashboard/examdetails/${course.id}`}>
        <div className="exam-course-info">
          <h3 className="exam-course-info-text">{course.title}</h3>
        </div>
      </Link>
    </div>
  ));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseData = await get(`${API_BASE_URL}/api/Course/GetCourses`);
      setCourse(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="exam-course-list-container">
        <h2 className="exam-course-header">Exam Courses</h2>
        <div className="exam-course-list">{courseElements}</div>
      </div>
    </>
  );
}

export default CourseExam;
