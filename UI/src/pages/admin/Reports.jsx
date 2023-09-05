import { useState, useEffect } from "react";
import { API_BASE_URL, get } from "../../service/APIService";

function Reports() {
  const [adminCount, setAdminCount] = useState(0);
  // const [examTakerCount, setExamTakerCount] = useState(0);
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

    // get(`${API_BASE_URL}/api/account/exam-taker-count`)
    //   .then((response) => {
    //     setExamTakerCount(response);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching exam taker count:", error);
    //   });

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
      <h1 className="reports-header">Reports</h1>
      <div className="reports">
        <div className="reports-items">
          <p className="reports-name">Administrators </p>
          <p className="reports-value">  {adminCount}</p>
        </div>
        <div className="reports-items">
          <p className="reports-name">Exam Takers </p>
          <p className="reports-value"> {examTakerCount}</p>
        </div>
        <div className="reports-items">
          <p className="reports-name">Exams </p>
          <p className="reports-value"> {examCount}</p>
        </div>
        <div className="reports-items">
          <p className="reports-name">Courses </p>
          <p className="reports-value"> {courseCount}</p>
        </div>
        <div className="reports-items">
          <p className="reports-name">Modules </p>
          <p className="reports-value"> {moduleCount}</p>
        </div>
        <div className="reports-items">
          <p className="reports-name">Questions </p>
          <p className="reports-value"> {questionCount}</p>
        </div>
      </div>
    </>
  );
}

export default Reports;
