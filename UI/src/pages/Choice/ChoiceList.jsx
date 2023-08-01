import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { get } from "../../service/APIService";
import { ExamContext } from "../../Context/ExamContext";

function ChoiceList(props) {
  const { choice, setChoice } = useContext(ExamContext);

  const choiceElements = choice.map((choice) => (
    <div key={choice.id} className="choice-tile">
      <div className="choice-info">
        <h3 className="choice-info-text">{choice.choiceContent}</h3>
      </div>
    </div>
  ));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await get(
          `https://localhost:7182/api/Choice/GetQuestionChoices?id=${props.qId}`
        );
        setChoice(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (	
    <>
      {choice ? (
          <div className="module-list">
            <div>
            {choiceElements}
            </div>
              
          </div>
      ) : (
        <h2>Loading</h2>
      )}
    </>
  );
}

export default ChoiceList;
