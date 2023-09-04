import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ExamContext } from "../../../context/ExamContext";
import { API_BASE_URL, get, put, del } from "../../../service/APIService";
import Timer from "./Timer";

function ExamHeader() {
  const { exam, setExam } = useContext(ExamContext);
  const [examination, setExamination] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseData = await get(
        `${API_BASE_URL}/api/Examination/GetExaminationByStartDateAndTakerId?examStartDate=${exam.startDateTime}&examTakerId=${exam.examTakerID}`
      );
      setExamination(responseData);
      console.log("me(getting the data is worksing");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEndExam = async (event) => {
    event.preventDefault();

    console.log("woahhoashhhaoahaoojldsjfoasjg:", exam);

    try {
      console.log("when button is clicked", examination);
      const response = await del(
        `${API_BASE_URL}/api/Examination/DeleteExamination/${examination.id}`
      );
      navigate(-1);
      console.log("end exam request successful:", response);
    } catch (error) {
      console.error("Error making put request:", error);
    }
  };


  return (
    <>
      <header className="examination-header">
        <button className="e-button" onClick={handleEndExam}>
          End Exam
        </button>
        <Timer />
      </header>
    </>
  );
}
export default ExamHeader;
