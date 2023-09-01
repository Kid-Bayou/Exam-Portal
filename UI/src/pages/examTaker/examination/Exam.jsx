import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { API_BASE_URL, get, post } from "../../../service/APIService";
import ChoiceList from "./Choices";

function Exam() {
  const params = useParams();
  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);

  
  
  const handleChoiceChange = (questionId, choiceId) => {
    // Find the index of the answer for the current question, if it exists
    const answerIndex = answers.findIndex((answer) => answer.questionID === questionId);

    if (answerIndex !== -1) {
      // If an answer for this question exists, update it
      setAnswers((prevAnswers) =>
        prevAnswers.map((answer, index) => {
          if (index === answerIndex) {
            return { ...answer, choiceID: choiceId };
          } else {
            return answer;
          }
        })
      );
    } else {
      // If no answer for this question exists, add a new one
      setAnswers((prevAnswers) => [
        ...prevAnswers,
        { examinationID: params.id, questionID: questionId, choiceID: choiceId },
      ]);
    }
  };

  const questionElements = question.map((question, index) => (
    <div key={question.id} className="e-question-tile">
      <div className="e-question-info">
        <h3 className="e-question-info-text">
          {index + 1}. {question.questionContent}
        </h3>
      </div>
      <ChoiceList qId={question.id} onChoiceChange={handleChoiceChange}/>
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
    try {
      await post(`${API_BASE_URL}/api/ExamAnswer/CreateExamAnswer`, answers);
      console.log("posting / submitting exam answers is worksing")
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

          <button className="button" onClick={submitAnswers}>Submit Exam</button>
      </div>
    </>
  );
}
export default Exam;
