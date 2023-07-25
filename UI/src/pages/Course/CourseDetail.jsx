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
            <h3 className="text-5xl p-20 font-bold">Course: {course.title}</h3>
            <p className="text-3xl p-3">Descritpion:</p>
            <p>{course.description}</p>
          </div>
        ) : (
          <h2>Loading</h2>
        )}
        <div className="mx-0 mt-20 py-3 px-0 shadow-lg">
          <Link to={"/modules"}>
            <h3>Modules</h3>
          </Link>
        </div>
      </div>
      <div className="mx-0 mt-10 py-3 px-0 shadow-lg">
        <Link to="/courses/updatecourse">Update Course</Link>
      </div>
    </>
  );
}

export default CourseDetail;
