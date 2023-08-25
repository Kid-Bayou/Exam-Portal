import { Link } from "react-router-dom";

import "../../../styles/Admin.css"

function MainPage() {
  return (
    <>
      <h1 className="um-header">User Management</h1>
      <div className="um-button-container">
        <Link to="/admindashboard/usermanagement/admins">
          <button className="button">Administrators</button>
        </Link>
        <Link to="/">
          <button className="button">Exam Takers</button>
        </Link>
      </div>
    </>
  );
}

export default MainPage;
