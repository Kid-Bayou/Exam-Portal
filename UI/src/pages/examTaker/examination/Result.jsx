import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ExamContext } from "../../../context/ExamContext";
import { API_BASE_URL, get } from "../../../service/APIService";

import "../../../styles/Examination.css";

function Result() {
  const params = useParams();
  const [result, setResult] = useState(null);
  const [module, setModule] = useState(null);
  const [examination, setExamination] = useState(null);
  const [passStatus, setPassStatus] = useState("");


  useEffect(() => {
    fetchExamination();
    fetchResult();
  }, []);
  
  useEffect(() => {
    fetchModule();
  }, [examination]);

  useEffect(() => {
    fetchPassStatus();
  }, [module]);

  

  const fetchExamination = async () => {
    try {
      const responseData = await get(
        `${API_BASE_URL}/api/Examination/GetExamination?id=${params.id}`
      );
      setExamination(responseData);
    } catch (error) {
      console.error("Error fetching result data:", error);
    }
  };

  const fetchModule = async () => {
    try {
      const responseData = await get(
        `${API_BASE_URL}/api/Module/GetModule?id=${examination.moduleID}`
      );
      setModule(responseData);
    } catch (error) {
      console.error("Error fetching result data:", error);
    }
  };

  const fetchResult = async () => {
    try {
      const responseData = await get(
        `${API_BASE_URL}/api/Result/GetExamResult?eId=${params.id}`
      );
      setResult(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const fetchPassStatus = () => {
    if (module !== null && result !== null && result.totalMark !== null) {
      if (result.totalMark >= module.passingMark) {
        setPassStatus("You have passed");
      } else {
        setPassStatus("You have failed");
      }
    } else {
      setPassStatus("Loading...");
    }
  };

  return (
    <>
      <div className="result-container">
        <h1 className="result-header">You're Done Already?</h1>
        {result && <p> {result.totalMark} % </p>}
        {passStatus}
      </div>
    </>
  );
}

export default Result;
