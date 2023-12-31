import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import { API_BASE_URL, get } from "../../../service/APIService";

import "../../../styles/Admin.css";

function CourseList() {
  const [course, setCourse] = useState([]);

  const courseElements = course.map((course) => (
    <div key={course.id} className="course-tile">
      <Link to={`/admindashboard/courses/${course.id}`}>
        <div className="course-info">
          <p className="course-info-text">{course.title}</p>
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
      <div className="course-list-container">
        <h2 className="course-header">Courses</h2>
        <div className="course-list">{courseElements}</div>
      </div>
      <div className="create-course-container">
        <Link to="/admindashboard/courses/createcourse">
          <button className="button">Create Course</button>
        </Link>
      </div>
    </>
  );
}

export default CourseList;
