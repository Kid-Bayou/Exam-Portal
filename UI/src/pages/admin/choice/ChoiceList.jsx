import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL, get } from "../../../service/APIService";

function ChoiceList(props) {
  const [choices, setChoices] = useState([]);

  const handleChoiceChange = (choiceId) => {
    setChoices((prevChoices) => prevChoices.map(choice => ({
      ...choice,
      selected: choice.id === choiceId
    })));
  };

  const choiceElements = choices.map((choiceItem) => (
    <div key={choiceItem.id} className="choice-tile">
      <form className="radio-btn-form">
        <label className="radio-btn-label">
          <input
            type="radio"
            name="choice"
            value={choiceItem.id}
            className="radio-btn-input"
            checked={choiceItem.selected}
            onChange={() => handleChoiceChange(choiceItem.id)}
          />
          <span className={`radio-btn-span ${choiceItem.selected ? 'selected' : ''}`}>{choiceItem.choiceContent}</span>
        </label>
      </form>
    </div>
  ));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await get(
          `${API_BASE_URL}/api/Choice/GetQuestionChoices?id=${props.qId}`
        );
        setChoices(responseData.map(choice => ({
          ...choice,
          selected: false
        })));
      } catch (error) {
        if (error.response.status === 404) {
          setChoices([]);
        }
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [props.qId]);

  return (
    <>
      {choices.length > 0 ? (
        <div className="choice-list">
          <div>{choiceElements}</div>
        </div>
      ) : (
        <h2>Loading</h2>
      )}
    </>
  );
}

export default ChoiceList;
