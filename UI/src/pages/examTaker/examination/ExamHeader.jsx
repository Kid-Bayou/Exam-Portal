import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ExamContext } from "../../../context/ExamContext";
import { API_BASE_URL, put } from "../../../service/APIService";
import Timer from "./Timer"

function ExamHeader() {
  
  const { exam, setExam } = useContext(ExamContext);
  const navigate = useNavigate();
  const currentDateTime = new Date();

 const handleEndExam = async (event) => {
    event.preventDefault();

    setExam((prevExam) => ({
      ...prevExam,
      
      endDateTime: `${currentDateTime.toISOString()}`,
    }));

    console.log("woahhoashhhaoahaoojldsjfoasjg:", exam);
    console.log("woahhoashhhaoahaoojldsjfoasjg:", exam.id);
    try {
      const response = await put(
        `${API_BASE_URL}/api/Course/UpdateExamination/${exam.id}`,
        exam
      );
      navigate("examination/result/1")
      console.log("end exam request successful:", response);
    } catch (error) {
      console.error("Error making put request:", error);
    }
  }

  return (
    <>
      <header className="examination-header">
          <button className="e-button" onClick={handleEndExam}>End Exam</button>
        <Timer  />
      </header>
    </>
  );
}
;
export default ExamHeader;