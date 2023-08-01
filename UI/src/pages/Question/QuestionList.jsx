import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { get } from "../../service/APIService";
import {ExamContext} from "../../Context/ExamContext"

function QuestionList() {
  const params = useParams();
  const { question, setQuestion } = useContext(ExamContext);

  const questionElements = question.map((question) => (
    <div key={question.id} className="question-tile">
      <Link to={`/questions/${question.id}`}>
        <div className="question-info">
          <h3 className="question-info-text">{question.questionContent}</h3>
        </div>
      </Link>
    </div>
  ));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await get(
          `https://localhost:7182/api/Question/GetModuleQuestions?id=${params.id}`
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
        <Link to={`/questions/createquestion/${params.id}`}>
          <button className="button">Create Question</button>
        </Link>
      </div>
    </>
  );
}

export default QuestionList;
