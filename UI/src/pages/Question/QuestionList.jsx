import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { API_BASE_URL, get } from "../../service/APIService";
import { ExamContext } from "../../Context/ExamContext";
import ChoiceList from "../Choice/ChoiceList"

function QuestionList() {
  const params = useParams();
  const { question, setQuestion } = useContext(ExamContext);
  const [visibleChoices, setVisibleChoices] = useState({});

  const questionElements = question.map((question) => (
    <div key={question.id} className="question-tile" onClick={() => toggleChoices(question.id)}>
      <div className="question-info">
        <h3 className="question-info-text">{question.questionContent}</h3>
      </div>
      {visibleChoices[question.id] && <ChoiceList qId={question.id}/>}
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
          <div className="question-list">

              {questionElements}

          </div>
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
