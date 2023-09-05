import { useNavigate } from "react-router-dom";
import search from "../../../assets/icons/searchbar.png";
import user from "../../../assets/icons/user.png";
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
        <img src={search} className="dashboard-header-img" />
        <img src={user} className="dashboard-header-img" />
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>
    </>
  );
}

export default Header;
