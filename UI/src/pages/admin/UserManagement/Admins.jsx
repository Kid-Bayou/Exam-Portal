import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import { API_BASE_URL, get } from "../../../service/APIService";

import "../../../styles/Admin.css";

function Admin() {
    const [admin, setAdmin] = useState([]);

    const adminElements = admin.map((admin) => (
      <div key={admin.id} className="admin-tile">
        <Link to="/">
          <div className="admin-info">
            <h3 className="admin-info-text">{admin.firstName}</h3>
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
        <div className="admin-list-container">
          <h2 className="admin-header">Admins</h2>
          <div className="admin-list">{adminElements}</div>
        </div>
        <div className="create-admin-container">
          <Link to="/admindashboard/admin/createcourse">
            <button className="button">Create Admin</button>
          </Link>
        </div>
      </>
    );
}

export default Admin