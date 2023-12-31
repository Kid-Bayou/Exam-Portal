import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { API_BASE_URL, get } from "../../../service/APIService";

import "../../../styles/Admin.css";

function ModuleList() {
  const params = useParams();
  const [module, setModule] = useState([]);

  const moduleElements = module.map((module) => (
    <div key={module.id} className="module-tile">
      <Link to={`/admindashboard/modules/moduledetail/${module.id}`}>
        <div className="module-info">
          <h3 className="module-info-text">{module.title}</h3>
        </div>
      </Link>
    </div>
  ));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseData = await get(
        `${API_BASE_URL}/api/Module/GetCourseModules?id=${params.id}`
      );
      setModule(responseData);
    } catch (error) {
      if (error.response.status === 404) {
        setModule([]);
      }
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      {module ? (
        <div className="module-list-container">
          <h2 className="module-header">Module</h2>
          <div className="module-list">{moduleElements}</div>
        </div>
      ) : (
        <h2>Loading</h2>
      )}

      <div className="module-list-button">
        <Link to={`/admindashboard/modules/createmodule/${params.id}`}>
          <button className="button">Create Module</button>
        </Link>
      </div>
    </>
  );
}

export default ModuleList;
