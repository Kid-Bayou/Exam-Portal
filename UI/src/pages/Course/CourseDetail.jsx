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
            <h4 className="course-description-header">Description:</h4>
            <p>{course.description}</p>
          </div>
        ) : (
          <h2>Loading</h2>
        )}
      </div>
      <div className="course-detail-buttons">
        <Link to={`/courses/updatecourse/${params.id}`}>
          <button className="button">Update Course</button>
        </Link>
        <Link to={`/modules/${params.id}`}>
          <button className="button">Modules</button>
        </Link>
      </div>
    </>
  );
}

export default CourseDetail;
