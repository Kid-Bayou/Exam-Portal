import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { get } from "../../service/APIService";

function ModuleDetail() {
  const params = useParams();
  const [module, setModule] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await get(
          `https://localhost:7182/api/Module/GetModule?id=${params.id}`
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
            <h4 className="module-description-header">Description:</h4>
            <p>{module.description}</p>
          </div>
        ) : (
          <h2>Loading</h2>
        )}
      </div>
      <div className="module-detail-buttons">
        <Link to={`/modules/updatemodule/${params.id}`}>
          <button className="button">Update Module</button>
        </Link>
        <Link to={`/modules/deletemodule/${params.id}`}>
          <button className="button">Delete Module</button>
        </Link>
        <Link to={`/modules/${params.id}`}>
          <button className="button">Modules</button>
        </Link>
      </div>
    </>
  );
}

export default ModuleDetail;
