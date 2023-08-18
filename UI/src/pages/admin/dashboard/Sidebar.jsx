import {useState } from "react";
import {Link, useLocation} from "react-router-dom"
import logo from "../../../assets/logo.png";
import home from "../../../assets/icons/home.png"
import exams from "../../../assets/icons/exams.png"
import history from "../../../assets/icons/history.png"
import notification from "../../../assets/icons/notification.png"
import leaderboard from "../../../assets/icons/leaderboard.png"
import help from "../../../assets/icons/help.png"
import profile from "../../../assets/icons/profile.png"
import left from "../../../assets/icons/left-arrow.png"
import right from "../../../assets/icons/right-arrow.png"


function Sidebar({}) {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const sidebarLinks = [
    {path: "/userdashboard", text: "Home", image: home},
    {path: "/userdashboard/courses", text: "Courses", image: exams},
    {path: "/userdashboard/usermanagement", text: "UserManagement", image: notification},
    {path: "/userdashboard/help", text: "Help", image: help},
    {path: "/userdashboard/profile", text: "Profile", image: profile},
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
