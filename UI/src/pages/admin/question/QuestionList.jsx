import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { API_BASE_URL, get, put } from "../../../service/APIService";
import {toJSON, fromJSON} from 'flatted';
import ChoiceList from "../choice/ChoiceList";
import toggle from "../../../assets/icons/toggle.png";
import edit from "../../../assets/icons/edit.png";
import del from "../../../assets/icons/delete.png";
import save from "../../../assets/icons/save.png"

import "../../../styles/Admin.css";

function QuestionList() {
  const params = useParams();
  const [question, setQuestion] = useState([]);
  const [visibleChoices, setVisibleChoices] = useState({});
  const [changedChoice, setChangedChoice] = useState({
    id: "",
    answerChoiceID: "",
  });
  
  const handleChangedChoice = (qId, cId) => {
    console.log(qId, cId)

    setChangedChoice((prevChangedChoice) => ({
      ...prevChangedChoice,
      id: qId,
      answerChoiceID: cId,
    } ));
  };

  useEffect(() => {
    
    // console.log("changed choice", changedChoice)
    // console.log("changed choice.answerChoiceID", changedChoice.answerChoiceID)
    // console.log("changed choice.id", changedChoice.id)

    // console.log("ahhhhhhhhhhhhhhhh stayin aliveee aaaha ahahahahah")
    // console.log("quest for truth", question)
  }, [changedChoice]);


  const handleChoiceSelected = async (event) => {
    event.preventDefault();
    const qIndex = question.findIndex(q => q.id === changedChoice.id);
    if (qIndex !== -1){
      const updatedQuestion = [...question];
      updatedQuestion[qIndex].answerChoiceID = changedChoice.answerChoiceID;
      setQuestion(updatedQuestion)
      
      handleSaveChoice(updatedQuestion[qIndex])
    }
  }


  const handleSaveChoice = async (updatedQuestion) => {
  
    try {
      const response = await put(
        `${API_BASE_URL}/api/Question/UpdateQuestion/${updatedQuestion.id}`,
        updatedQuestion
      );
      console.log("put request successful:", response);
    } catch (error) {
      console.error("Error making put request:", error);
    }
  };


  

  const questionElements = question.map((question, index) => (
    <div key={question.id} className="question-tile">
      <div className="question-info">
        <h3 className="question-info-text">
          {index + 1}. {question.questionContent}
        </h3>
        <Link
          to={`/admindashboard/questions/updatequestion/${question.id}`}
          className="edit-container"
        >
          <img src={edit} className="edit" />
        </Link>
        <Link
          to={`/admindashboard/questions/deletequestion/${question.id}`}
          className="edit-container"
        >
          <img src={del} className="edit" />
        </Link>
        <img
          src={toggle}
          className="toggle"
          onClick={() => toggleChoices(question.id)}
        />
        <img src={save} className="edit" onClick={handleChoiceSelected}/>
      </div>
      {visibleChoices[question.id] && <ChoiceList selectedChoiceId={question.answerChoiceID} qId={question.id} onValueChange={handleChangedChoice}/>}
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
        <Link to={`/admindashboard/questions/createquestion/${params.id}`}>
          <button className="button">Create Question</button>
        </Link>
      </div>
    </>
  );
}

export default QuestionList;
