import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ExamContext } from "../../../context/ExamContext";
import { API_BASE_URL, get, put } from "../../../service/APIService";
import Timer from "./Timer"

function ExamHeader() {
  
  const { exam, setExam } = useContext(ExamContext);
  const [examination , setExamination] = useState(null)
  const [newExam, setNewExam] = useState({
    id: "",
      title: "",
      startDateTime: "",
      endDateTime: "",
      moduleID: "",
      examTakerID: "",
  })
  const navigate = useNavigate();
  const currentDateTime = new Date();

    
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const responseData = await get(`${API_BASE_URL}/api/Examination/GetExaminationByStartDateAndTakerId?examStartDate=${exam.startDateTime}&examTakerId=${exam.examTakerID}`);
      setExamination(responseData);
      console.log("me(getting the data is worksing")
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEndExam = async (event) => {
    event.preventDefault();
  
    console.log("woahhoashhhaoahaoojldsjfoasjg:", exam);
  
    try {
      console.log("when button is clicked", newExam)
      console.log("when button is clicked", newExam.id)
       const response = await put(
         `${API_BASE_URL}/api/Examination/UpdateExamination/${newExam.id}`,
         exam
       );
       navigate("examination/result/1")
       console.log("end exam request successful:", response);
     } catch (error) {
       console.error("Error making put request:", error);
     }
  };
  
  useEffect(() => {
    if (examination) {
      setNewExam((prevNewExam) => ({
        ...prevNewExam,
        id: examination.id,
        title: exam.title,
        startDateTime: exam.startDateTime,
        endDateTime: currentDateTime.toISOString(),
        moduleID: exam.moduleID,
        examTakerID: exam.examTakerID,
      }));
      console.log("i too am working!!!")
      console.log("me?", newExam)
    }
  }, [examination]);

  

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