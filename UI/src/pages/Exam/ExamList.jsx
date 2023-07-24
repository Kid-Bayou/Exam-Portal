import {Link} from "react-router-dom"
import {useState, useEffect} from "react"

function ExamList() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetch("/api/exam")
      .then((res) => res.json())
      .then((data) => setExams(data.exams))
  }, []);

  const examElements = exams.map((exam) => (
    <div key={exam.id} className="exam-tile">
      <Link to={`/exams/${exam.id}`}>
        <div className="exam-info">
          <h3>{exam.title}</h3>
        </div>
      </Link>
    </div>
  ))

  return (
    <>
      <div className="exam-list-container">
        <h1>Exams</h1>
        <div className="exam-list">{examElements}</div>
      </div>
    </>
  );
}

export default ExamList;
