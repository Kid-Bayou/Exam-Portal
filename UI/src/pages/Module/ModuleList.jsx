import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import {get} from "../../service/APIService"

function ModuleList() {
  const [module, setModule] = useState([]);

 const moduleElements = module.map((module) => (
   <div key={module.id} className="grid mt-16">

     <Link to={`/modules/${module.id}`}>
       <div className="shadow-lg p-12 pl-16 pr-16">
         <h3>{module.title}</h3>
       </div>
     </Link>
     
   </div>
  ));

  useEffect(() => {
    const fetchData = async() => {
      try {
        const responseData = await get("https://localhost:7182/api/Module/GetModules");
        setModule(responseData);
      } catch(error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  return (
    <>
      <div className="module-list-container">

        <div className="module-list">
          {moduleElements}
        </div>
      </div>
      <div>
      <Link to="/courses/createcourse">
          Create Course
        </Link>
      </div>
    </>
  );
}

export default ModuleList;
