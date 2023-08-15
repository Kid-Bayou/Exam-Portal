import Sidebar from "./Sidebar";
import "./Dashboard.css";

function Layout() {
  return (
    <>
      <div className="dashboard-wrapper">
        <Sidebar></Sidebar>
        <main className="dashboard-main"></main>
      </div>
    </>
  );
}

export default Layout;