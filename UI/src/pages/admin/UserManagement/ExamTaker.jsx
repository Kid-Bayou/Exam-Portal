import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import { API_BASE_URL, get } from "../../../service/APIService";

import "../../../styles/Admin.css";

function ExamTaker() {
    const [examTaker, setExamTaker] = useState([]);

    const examTakerElements = examTaker.map((examTaker) => (
      <div key={examTaker.id} className="examTaker-tile">
        <Link to="/">
          <div className="examTaker-info">
            <h3 className="examTaker-info-text">{examTaker.firstName}</h3>
          </div>
        </Link>
      </div>
    ));
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const responseData = await get(`${API_BASE_URL}/api/Account/role?roleName=ExamTaker`);
        setExamTaker(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    return (
      <>
        <div className="examTaker-list-container">
          <h2 className="examTaker-header">Exam Takers</h2>
          <div className="examTaker-list">{examTakerElements}</div>
        </div>
      </>
    );
}

export default ExamTaker