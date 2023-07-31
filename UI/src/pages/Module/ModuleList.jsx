import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { get } from "../../service/APIService";
import {ExamContext} from "../../Context/ExamContext"

function ModuleList() {
  const { module, setModule } = useContext(ExamContext);

  const moduleElements = module.map((module) => (
    <div key={module.id} className="module-tile">
      <Link to={`/modules/${module.id}`}>
        <div className="module-info">
          <h3 className="module-info-text">{module.title}</h3>
        </div>
      </Link>
    </div>
  ));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await get(
          "https://localhost:7182/api/Module/GetModules"
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
      <div className="module-list-container">
        <h2 className="module-header">Module</h2>
        <div className="module-list">{moduleElements}</div>
      </div>
      <div className="module-list-button">
        <Link to="/courses/createcourse">
          <button className="button">Create Module</button>
        </Link>
      </div>
    </>
  );
}

export default ModuleList;
