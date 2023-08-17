import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL, get } from "../../../service/APIService";

function ExamDetails() {
  const params = useParams();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await get(
          `${API_BASE_URL}/api/Course/GetCourse?id=${params.id}`
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
          <div className="exam-course-detail">
            <h3 className="exam-course-name">{course.title}</h3>
            <h4 className="exam-course-description-header">Description:</h4>
            <p>{course.description}</p>
          </div>
        ) : (
          <h2>Loading</h2>
        )}
      </div>
      <ModuleList cId={course.id}/>
    </>
  );
}
;

export function ModuleList(props) {
    
    const [module, setModule] = useState([]);
  
    const moduleElements = module.map((module) => (
      <div key={module.id} className="module-tile">
        <Link to={`/modules/moduledetail/${module.id}`}>
          <div className="module-info">
            <h3 className="module-info-text">{module.title}</h3>
          </div>
        </Link>
      </div>
    ));
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const responseData = await get(
          `${API_BASE_URL}/api/Module/GetCourseModules?id=${props.cId}`
        );
        setModule(responseData);
      } catch (error) {
        if (error.response.status === 404) {
          setModule([]);
        }
        console.error("Error fetching data:", error);
      }
    };
  
    return (
      <>
        {module ? (
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

export default ExamDetails




