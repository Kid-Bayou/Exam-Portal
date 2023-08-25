import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import { API_BASE_URL, get } from "../../../service/APIService";

import "../../../styles/Admin.css";

function Admin() {
    const [admin, setAdmin] = useState([]);

    const adminElements = admin.map((admin) => (
      <div key={admin.id} className="um-tile">
        <Link to="/">
          <div className="um-info">
            <h3 className="um-info-text">{admin.firstName} {admin.lastName}</h3>
          </div>
        </Link>
      </div>
    ));
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const responseData = await get(`${API_BASE_URL}/api/Account/role?roleName=Administrator`);
        setAdmin(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    return (
      <>
        <div className="um-list-container">
          <h2 className="um-header">Adminstrators</h2>
          <div className="um-list">{adminElements}</div>
        </div>
        <div className="um-admin-button-container">
          <Link to="/admindashboard/admin/createcourse">
            <button className="button">Add Admin</button>
          </Link>
        </div>
      </>
    );
}

export default Admin