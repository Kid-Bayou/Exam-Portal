import { Link, NavLink } from "react-router-dom";

function ExamHeader() {
  return (
    <>
      <header>
        <Link to="/">End Exam</Link>
        <Timer time="20" />
      </header>
    </>
  );
}
;
export default ExamHeader;
