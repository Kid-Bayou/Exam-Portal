import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL, get, post } from "../../../service/APIService";
import ChoiceList from "./Choices";

function Exam() {
  const params = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);

  
  
  const handleChoiceChange = (questionId, choiceId) => {
    const answerIndex = answers.findIndex((answer) => answer.questionID === questionId);

    if (answerIndex !== -1) {
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
      console.log("Answers data:", answers);

      for (const answer of answers) {
        await post(`${API_BASE_URL}/api/ExamAnswer/CreateExamAnswer`, answer);
        console.log("Posted answer:", answer);
      }
      navigate("/userdashboard/result/1");
      console.log("All answers posted successfully");
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
