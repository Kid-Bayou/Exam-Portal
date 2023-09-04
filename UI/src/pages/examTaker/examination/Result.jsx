import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ExamContext } from "../../../context/ExamContext";
import { API_BASE_URL, get } from "../../../service/APIService";

import "../../../styles/Examination.css";

function Result() {
  const params = useParams();
  const [result, setResult] = useState(0);
  const [tQuestion, setTQuestion] = useState(0);
  const { exam, setExam } = useContext(ExamContext);
  const [percentage, setPercentage] = useState(0);
  const [module, setModule] = useState(null);

  useEffect(() => {
    fetchResultData();
  }, [params.id]);

  const fetchResultData = async () => {
    try {
      const responseData = await get(
        `${API_BASE_URL}/api/ExamAnswer/GetTotalCorrectAnswers/${params.id}`
      );
      setResult(responseData);
      console.log("whooppusikjfalk:", exam);
    } catch (error) {
      console.error("Error fetching result data:", error);
    }
  };

  useEffect(() => {
    fetchTResultData();
  }, [params.id]);

  const fetchTResultData = async () => {
    try {
      const responseData = await get(
        `${API_BASE_URL}/api/Question/GetQuestionCount/${exam.moduleID}`
      );
      setTQuestion(responseData);
      console.log("TResult data:", responseData);
    } catch (error) {
      console.error("Error fetching tResult data:", error);
    }
  };

  useEffect(() => {
    fetchModuleData();
  }, [params.id]);

  const fetchModuleData = async () => {
    try {
      const responseData = await get(
        `${API_BASE_URL}/api/Module/GetModule?id=${exam.moduleID}`
      );
      setModule(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (tQuestion !== 0) {
      const calculatedPercentage = (result / tQuestion) * 100;
      setPercentage(calculatedPercentage);
    }
  }, [result, tQuestion]);

  const getPassingStatus = () => {
    if (module && percentage !== null) {
      if (percentage >= module.passingMark) {
        return "You have passed";
      } else {
        return "You have failed";
      }
    }
    return "";
  };

  return (
    <>
      <div className="result-container">
        <h1 className="result-header">You're Done Already?</h1>
        <p className="result-mark">
          {result} / {tQuestion}
        </p>
        <p className="result-percent">Percentage: {percentage}%</p>
        <p className="result-pass-status">{getPassingStatus()}</p>
      </div>
    </>
  );
}

export default Result;
