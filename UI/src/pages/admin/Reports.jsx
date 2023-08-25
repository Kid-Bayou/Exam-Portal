import { useState, useEffect } from "react";
import { API_BASE_URL, get } from "../../service/APIService";

function Reports() {
  const [adminCount, setAdminCount] = useState(0);
  const [examTakerCount, setExamTakerCount] = useState(0);
  const [examCount, setExamCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [moduleCount, setModuleCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    get(`${API_BASE_URL}/api/account/admin-count`)
      .then((response) => {
        setAdminCount(response);
      })
      .catch((error) => {
        console.error("Error fetching admin count:", error);
      });

    get(`${API_BASE_URL}/api/account/exam-taker-count`)
      .then((response) => {
        setExamTakerCount(response);
      })
      .catch((error) => {
        console.error("Error fetching exam taker count:", error);
      });
      
    get(`${API_BASE_URL}/api/Examination/GetExaminationCount`)
    .then((response) => {
      setExamCount(response);
    })
    .catch((error) => {
      console.error("Error fetching examination count:", error);
    });
    
    get(`${API_BASE_URL}/api/Course/GetCourseCount`)
      .then((response) => {
        setCourseCount(response);
      })
      .catch((error) => {
        console.error("Error fetching course count:", error);
      });

      get(`${API_BASE_URL}/api/Module/GetModuleCount`)
      .then((response) => {
        setModuleCount(response);
      })
      .catch((error) => {
        console.error("Error fetching module count:", error);
      });
      
    get(`${API_BASE_URL}/api/Question/GetQuestionCount`)
    .then((response) => {
      setQuestionCount(response);
    })
    .catch((error) => {
      console.error("Error fetching question count:", error);
    });
  }, []);

  return (
    <>
      <h1>Reports</h1>
      <p>Administrators {adminCount}</p>
      <p>Exam Takers {examTakerCount}</p>
      <p>Exams {examCount}</p>
      <p>Courses {courseCount}</p>
      <p>Modules {moduleCount}</p>
      <p>Questions {questionCount}</p>
    </>
  );
}

export default Reports;
