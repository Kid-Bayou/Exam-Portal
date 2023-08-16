import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
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


function Sidebar({}) {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const sidebarLinks = [
    {path: "/userdashboard", text: "Home", image: home},
    {path: "/courses", text: "Exams", image: exams},
    {path: "/userdashboard/history", text: "History", image: history},
    {path: "/userdashboard/notification", text: "Notification", image: notification},
    {path: "/courses", text: "Leaderboad", image: leaderboard},
    {path: "/userdashboard/help", text: "Help", image: help},
    {path: "/userdashboard/profile", text: "Profile", image: profile},
  ];

  return (
    <aside className={`sidebar ${expanded ? "expanded" : "collapsed"}`}>
      <nav className="sidebar-nav">
        <div className="sidebar-top">
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
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="custom-button"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <div className="sidebar-main">
          <ul className="sidebar-main-ul">
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
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="sidebar-bottom-image"
          />
          <div className={`custom-container ${expanded ? "expanded" : ""}`}>
            <div className="custom-info">
              <h4 className="custom-name">John Doe</h4>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar
