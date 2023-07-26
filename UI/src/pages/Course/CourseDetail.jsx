import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { get } from "../../service/APIService";

function CourseDetail() {
  const params = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await get(
          `https://localhost:7182/api/Course/GetCourse?id=${params.id}`
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
      <div className="course-detail-container">
        {course ? (
          <div className="course-detail">
          <h3 className="course-name">{course.title}</h3>
            <p>{course.description}</p>
          </div>
        ) : (
          <h2>Loading</h2>
        )}
        <div className="course-detail-module">
          <Link to={"/modules"}>
            <h3>Modules</h3>
          </Link>
        </div>
      </div>
      <div className="update-course-container">
        <Link to="/courses/updatecourse">Update Course</Link>
      </div>
    </>
  );
}

export default CourseDetail;
