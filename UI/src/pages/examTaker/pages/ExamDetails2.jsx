import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL, get, post } from "../../../service/APIService";

import "../../../styles/Pages.css"

function ExamDetails2() {
  const params = useParams();
  const navigate = useNavigate();
  const currentDateTime = new Date();
  const [module, setModule] = useState(null);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseData = await get(
        `${API_BASE_URL}/api/Module/GetModule?id=${params.id}`
      );
      setModule(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleStartExam = async () => {
    try {
      const response = await post(
        `${API_BASE_URL}/api/Examination/CreateExamination`,
        {
          title: "this",
          startDateTime: `${currentDateTime.toISOString()}`,
          endDateTime: `${currentDateTime.toISOString()}`,
          moduleID: `${params.id}`, 
          examTakerID: 1,
        }
      );
  
        navigate(`/examination/${params.id}`);
      
    } catch (error) {
      console.error("Error creating examination:", error);
    }
  };

  return (
    <>
      <div className="module-detail-container">
        {module ? (
          <div className="module-detail">
            <h3 className="module-name">{module.title}</h3>
            <h4 className="module-description-header">
              Duration: {module.duration}
            </h4>
            <h4 className="module-description-header">
              PassingMark: {module.passingMark}
            </h4>
          </div>
        ) : (
          <h2>Loading</h2>
        )}
      </div>
      <div className="module-detail-buttons">
          <button className="button" onClick={handleStartExam}>Start Exam</button>
      </div>
    </>
  );
}

export default ExamDetails2;