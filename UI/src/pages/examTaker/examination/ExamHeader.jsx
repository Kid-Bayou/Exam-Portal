import { Link, NavLink } from "react-router-dom";
import Timer from "./Timer"

function ExamHeader() {
  return (
    <>
      <header className="examination-header">
        <Link to="/">
          <button className="e-button">End Exam</button>
          </Link>
        <Timer  />
      </header>
    </>
  );
}
;
export default ExamHeader;
