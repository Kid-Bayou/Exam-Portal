import {Outlet} from "react-router-dom"
import Sidebar from "./Sidebar";
import "./Dashboard.css";

function Layout() {
  return (
    <>
      <div className="dashboard-wrapper">
        <Sidebar />
        <main className="dashboard-main"></main>
      </div>
    </>
  );
}

export default Layout;
