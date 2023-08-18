import {Outlet} from "react-router-dom"
import Sidebar from "./Sidebar";
import Header from "./Header"
import "./Dashboard.css";

function Layout() {
  return (
    <>
      <div className="dashboard-wrapper">
        <Sidebar />
        <div className="dashboard-body">
          <Header />
          <main className="dashboard-main">
          <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default Layout;
