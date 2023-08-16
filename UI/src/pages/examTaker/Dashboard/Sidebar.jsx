import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";
import logo from "../../../assets/logo.png";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

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

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="sidebar-main">{children}</ul>
        </SidebarContext.Provider>

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

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
