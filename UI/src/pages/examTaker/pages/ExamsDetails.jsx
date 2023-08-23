import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL, get } from "../../../service/APIService";

import "../../../styles/Pages.css"

function ExamDetails() {
  const params = useParams();
  const [course, setCourse] = useState([]);
  const [modules, setModules] = useState([]);

  const fetchData = async () => {
    try {
      const responseData = await get(
        `${API_BASE_URL}/api/Module/GetCourseModules?id=${params.id}`
      );
      setModules(responseData);
    } catch (error) {
      if (error.response.status === 404) {
        setModules([]);
      }
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const responseData = await get(
          `${API_BASE_URL}/api/Course/GetCourse?id=${params.id}`
        );
        setCourse(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCourseData();
    fetchData();
  }, [params.id]);

  const moduleElements = modules.map((moduleItem) => (
    <div key={moduleItem.id} className="module-tile">
      <Link to={`/userdashboard/examdetail2/${moduleItem.id}`}>
        <div className="module-info">
          <h3 className="module-info-text">{moduleItem.title}</h3>
        </div>
      </Link>
    </div>
  ));

  return (
    <>
      <div className="course-detail-container">
        {course ? (
          <div className="exam-course-detail">
            <h3 className="exam-course-name">{course.title}</h3>
            <h4 className="exam-course-description-header">Description:</h4>
            <p>{course.description}</p>
          </div>
        ) : (
          <h2>Loading</h2>
        )}
      </div>
      {modules ? (
        <div className="module-list-container">
          <h2 className="module-header">Module</h2>
          <div className="module-list">{moduleElements}</div>
        </div>
      ) : (
        <h2>Loading</h2>
      )}
    </>
  );
}

export default ExamDetails;
