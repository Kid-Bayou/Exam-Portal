import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { API_BASE_URL, get, post } from "../../../service/APIService";
import ChoiceList from "./Choices";

function Exam() {
  const params = useParams();
  const [question, setQuestion] = useState([]);

  const questionElements = question.map((question, index) => (
    <div key={question.id} className="e-question-tile">
      <div className="e-question-info">
        <h3 className="e-question-info-text">
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

  const submitAnswers = async () => {
    const answers = question.map((q) => ({
      questionId: q.id,
      choiceId: q.choices.find((choice) => choice.selected)?.id,
    }));

    try {
      const response = await post(`${API_BASE_URL}/api/SubmitAnswers`, answers);
      console.log("Answers submitted:", response);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  return (
    <>
      <div className="e-container">
        {question ? (
          <div className="e-question-list-container">
            <div className="e-question-list">{questionElements}</div>
          </div>
        ) : (
          <h2>Loading</h2>
        )}

        <Link to={`/admindashboard/modules/createmodule/${params.id}`}>
          <button className="button" onClick={submitAnswers}>Submit Exam</button>
        </Link>
      </div>
    </>
  );
}
export default Exam;
