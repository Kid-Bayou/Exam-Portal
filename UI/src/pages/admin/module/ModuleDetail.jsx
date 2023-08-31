import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL, get } from "../../../service/APIService";

import "../../../styles/Admin.css";

function ModuleDetail() {
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
            <div className="module-detail-detail">
              <h4 className="module-description-header">Duration:</h4>
              <p className="module-detail-detail-text">{module.duration}</p>
            </div>
            <div className="module-detail-detail">
              <h4 className="module-description-header">Passing Mark:</h4>
              <p className="module-detail-detail-text">{module.passingMark}</p>
            </div>
          </div>
        ) : (
          <h2>Loading</h2>
        )}
        <div className="module-detail-buttons">
          <Link to={`/admindashboard/modules/updatemodule/${params.id}`}>
            <button className="button">Update Module</button>
          </Link>
          <Link to={`/admindashboard/modules/deletemodule/${params.id}`}>
            <button className="button">Delete Module</button>
          </Link>
          <Link to={`/admindashboard/questions/${params.id}`}>
            <button className="button">Questions</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ModuleDetail;
