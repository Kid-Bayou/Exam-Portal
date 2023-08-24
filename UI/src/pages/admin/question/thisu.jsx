import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { API_BASE_URL, get } from "../../../service/APIService";
import ChoiceList from "../choice/ChoiceList";

import "../../../styles/Admin.css";

function QuestionList() {
  const params = useParams();
  const [question, setQuestion] = useState([]);

  const questionElements = question.map((question, index) => (
    <div key={question.id} className="question-tile">
      <div className="question-info">
        <h3 className="question-info-text">
          {index + 1}. {question.questionContent}
        </h3>
      </div>
      <ChoiceList qId={question.id} />
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
        <Link to={`/admindashboard/questions/createquestion/${params.id}`}>
          <button className="button">Create Question</button>
        </Link>
      </div>
    </>
  );
}

export default QuestionList;
