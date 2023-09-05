import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { API_BASE_URL, get, post, put } from "../../../service/APIService";
import { ExamContext } from "../../../context/ExamContext";
import ChoiceList from "./Choices";

function Exam() {
  const params = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);

  const { exam, setExam } = useContext(ExamContext);
  const [examination, setExamination] = useState(null);
  const [newExam, setNewExam] = useState({
    id: "",
    title: "",
    startDateTime: "",
    endDateTime: "",
    moduleID: "",
    userID: "",
  });
  const currentDateTime = new Date();

  // End Exam Stuff 
  // ```````````````````


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseData = await get(
        `${API_BASE_URL}/api/Examination/GetExaminationByStartDateAndTakerId?examStartDate=${exam.startDateTime}&examTakerId=${exam.userID}`
      );
      setExamination(responseData);
      console.log("me(getting the data is worksing");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEndExam = async (event) => {
    event.preventDefault();

    console.log("woahhoashhhaoahaoojldsjfoasjg:", exam);

    try {
      console.log("when button is clicked", newExam);
      console.log("when button is clicked", newExam.id);
      const response = await put(
        `${API_BASE_URL}/api/Examination/UpdateExamination/${newExam.id}`,
        newExam
      );
      navigate(`/userdashboard/result/${examination.id}`);
      console.log("end exam request successful:", response);
    } catch (error) {
      console.error("Error making put request:", error);
    }
  };

  useEffect(() => {
    if (examination) {
      setNewExam((prevNewExam) => ({
        ...prevNewExam,
        id: examination.id,
        title: exam.title,
        startDateTime: exam.startDateTime,
        endDateTime: currentDateTime.toISOString(),
        moduleID: exam.moduleID,
        userID: exam.userID,
      }));
      console.log("i too am working!!!");
      console.log("me?", newExam);
    }
  }, [examination]);


  // Choice Change Stuff
  // ````````````````````

  
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
        { examinationID: examination.id, questionID: questionId, choiceID: choiceId },
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


  const submitAnswers = async (event) => {
    event.preventDefault();
    try {
      console.log("Answers data:", answers);

      for (const answer of answers) {
        await post(`${API_BASE_URL}/api/ExamAnswer/CreateExamAnswer`, answer);
        console.log("Posted answer:", answer);
      }
      handleEndExam(event);
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
