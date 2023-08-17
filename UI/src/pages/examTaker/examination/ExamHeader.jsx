import { Link, NavLink } from "react-router-dom";
import Timer from "./Timer"

function ExamHeader() {
  return (
    <>
      <header className="examination-header">
        <Link to="/">End Exam</Link>
        <Timer time="20" />
      </header>
    </>
  );
}
;
export default ExamHeader;
