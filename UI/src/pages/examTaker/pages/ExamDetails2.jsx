import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { API_BASE_URL, get, post } from "../../../service/APIService";
import { ExamContext } from "../../../context/ExamContext";
import Exam from "../examination/Exam"

import "../../../styles/Pages.css";

function ExamDetails2() {
  const params = useParams();
  const navigate = useNavigate();
  const currentDateTime = new Date();
  const [module, setModule] = useState(null);
  const { timer, setTimer } = useContext(ExamContext);
  const { exam, setExam } = useContext(ExamContext);
  
  const person = JSON.parse(localStorage.getItem("User"));

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

const handleSetTimer = () => {
  const time = module.duration * 60
  setTimer(time);  
};


  const handleStartExam = async () => {
    
  console.log("whattttt",person.id)
    try {
      const newExam = {
        title: "this",
        startDateTime: `${currentDateTime.toISOString()}`,
        endDateTime: `${currentDateTime.toISOString()}`,
        moduleID: `${params.id}`,
        userID: person.id,
      }
      const response = await post(
        `${API_BASE_URL}/api/Examination/CreateExamination`,
        newExam
      );
      
      
        setExam(newExam);

      handleSetTimer()
      navigate(`/examination/${params.id}`); 
      console.log("post request successful:", response);
      
    } catch (error) {
      console.error("Error creating examination:", error);
    }
  };

  useEffect(() => {
    console.log("time set: ", timer);
  }, [timer]);

  useEffect(() => {
    console.log("exam set: ", exam);
  }, [exam]);

  return (
    <>
      <div className="module-detail-container">
        {module ? (
          <div className="e-module-detail">
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
        <button className="button" onClick={handleStartExam}>
          Start Exam
        </button>
      </div>
    </>
  );
}

export default ExamDetails2;
