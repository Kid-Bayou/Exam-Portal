import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { API_BASE_URL, get } from "../../service/APIService";
import { ExamContext } from "../../context/ExamContext";
import ChoiceList from "../choice/ChoiceList";
import toggle from "../../assets/toggle.png";
import edit from "../../assets/edit.png";
import del from "../../assets/delete.png";

function QuestionList() {
  const params = useParams();
  const { question, setQuestion } = useContext(ExamContext);
  const [visibleChoices, setVisibleChoices] = useState({});
  var num = 0;

  const questionElements = question.map((question, index) => (
    <div key={question.id} className="question-tile">
      <div className="question-info">
        <h3 className="question-info-text">
          {index + 1}. {question.questionContent}
        </h3>
        <Link
          to={`/questions/updatequestion/${question.id}`}
          className="edit-container"
        >
          <img src={edit} className="edit" />
        </Link>
        <Link
          to={`/questions/deletequestion/${question.id}`}
          className="edit-container"
        >
          <img src={del} className="edit" />
        </Link>
        <img
          src={toggle}
          className="toggle"
          onClick={() => toggleChoices(question.id)}
        />
      </div>
      {visibleChoices[question.id] && <ChoiceList qId={question.id} />}
    </div>
  ));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await get(
          `${API_BASE_URL}/api/Question/GetModuleQuestions?id=${params.id}`
        );
        setQuestion(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const toggleChoices = (questionId) => {
    setVisibleChoices((prevVisibleChoices) => ({
      ...prevVisibleChoices,
      [questionId]: !prevVisibleChoices[questionId],
    }));
  };

  return (
    <>
      {question ? (
        <div className="question-list-container">
          <h2 className="question-header">Questions</h2>
          <div className="question-list">{questionElements}</div>
        </div>
      ) : (
        <h2>Loading</h2>
      )}

      <div className="question-list-button">
        <Link to={`/questions/createquestion/${params.id}`}>
          <button className="button">Create Question</button>
        </Link>
      </div>
    </>
  );
}

export default QuestionList;
