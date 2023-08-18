import search from "../../../assets/icons/searchbar.png";
import user from "../../../assets/icons/user.png";

function Header() {
  return (
    <>
      <header className="dashboard-header">
        <img src={search} className="dashboard-header-img" />
        <img src={user} className="dashboard-header-img" />
      </header>
    </>
  );
}

export default Header;
