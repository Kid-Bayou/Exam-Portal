import { useNavigate } from "react-router-dom";
import logout from "../../../service/APIAuthService"

function Header() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      logout();
      navigate("/");
    } catch (error) {
      console.error("Error Deleteing Course:", error);
    }
  };
  return (
    <>
      <header className="dashboard-header">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>
    </>
  );
}

export default Header;
