import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL, get } from "../../../service/APIService";

import "../../../styles/Pages.css"

function ExamDetails2() {
  const params = useParams();
  const [module, setModule] = useState(null);

  useEffect(() => {
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
    fetchData();
  }, []);

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
        <Link to={`/admindashboard/modules/updatemodule/${params.id}`}>
          <button className="button">Start Module</button>
        </Link>
      </div>
    </>
  );
}

export default ExamDetails2;
