import {useState } from "react";
import {Link, useLocation} from "react-router-dom"
import logo from "../../../assets/logo.png";
import home from "../../../assets/icons/home.png"
import courses from "../../../assets/icons/courses.png"
import usermanagement from "../../../assets/icons/usermanagement.png"
import reports from "../../../assets/icons/reports.png"
import help from "../../../assets/icons/help.png"
import profile from "../../../assets/icons/profile.png"
import left from "../../../assets/icons/left-arrow.png"
import right from "../../../assets/icons/right-arrow.png"


function Sidebar({}) {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const sidebarLinks = [
    {path: "/admindashboard", text: "Home", image: home},
    {path: "/admindashboard/courses", text: "Courses", image: courses},
    {path: "/admindashboard/usermanagement", text: "UserManagement", image: usermanagement},
    {path: "/admindashboard/report", text: "Reports", image: reports},
    {path: "/admindashboard/help", text: "Help", image: help},
    {path: "/admindashboard/profile", text: "Profile", image: profile},
  ];

  return (
    <aside className={`sidebar ${expanded ? "expanded" : "collapsed"}`}>
      <nav className="sidebar-nav">
        <div className={`sidebar-top ${expanded ? "expanded" : "collapsed"}`}>
          <img
            src={logo}
            className={`sidebar-logo ${expanded ? "expanded" : "collapsed"}`}
            alt=""
          />
          <h3
            className={`sidebar-header ${expanded ? "expanded" : "collapsed"}`}
          >
            Exam Portal
          </h3>
        </div>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className={`sidebar-button ${expanded ? "expanded" : "collapsed"}`}
          >
            {expanded ? <img className="left-arrow" src={left} /> : <img className="right-arrow" src={right} />}
          </button>

        <div className="sidebar-main">
          <ul className={`sidebar-main-ul ${expanded ? "expanded" : "collapsed"}`}>
        {sidebarLinks.map((link) => (
          <li key={link.path} className={location.pathname === link.path ? "active" : ""}>
            <Link to={link.path} className="sidebar-main-link">
              <img src={link.image} className="sidebar-main-img" />
              <span className={`sidebar-main-text ${expanded ? "expanded" : ""}`}>{link.text}</span>
              
            </Link>
          </li>
        ))}
      </ul>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-bottom-box">
            <h4 className="sidebar-bottom-box-text">JD</h4>
          </div>
              <h4 className={`sidebar-bottom-name ${expanded ? "expanded" : ""}`}>Jane Doe</h4>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar
