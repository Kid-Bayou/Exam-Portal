import { useState, useEffect } from "react";
import { API_BASE_URL, put, get } from "../../../service/APIService";
import { useParams, useNavigate, Link } from "react-router-dom";
import del from "../../../assets/icons/delete.png";

import "../../../styles/Admin.css";

function UpdateChoice(props) {
  const params = useParams();
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseData = await get(
        `${API_BASE_URL}/api/Choice/GetQuestionChoices?id=${props.qId}`
      );
      setFormData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChoiceChange = (index, event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData];
      updatedFormData[index][name] = value;
      return updatedFormData;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      for (const choiceData of formData) {
        const response = await put(
          `${API_BASE_URL}/api/Choice/UpdateChoice/${choiceData.id}`,
          choiceData
        );
        console.log(
          `Choice with ID ${choiceData.id} updated successfully:`,
          response
        );
      }
    } catch (error) {
      console.error("Error making put request:", error);
    }
  };

  return (
    <>
        <form onSubmit={handleSubmit} className="u-form">
          {formData.map((choiceData, index) => (
            <div className="update-choice-tile">
              <div key={choiceData.id} className="u-form-box">
                <p className="u-form-label">Choice Content:</p>
                <input
                  className="u-form-input"
                  type="text"
                  name="choiceContent"
                  value={choiceData.choiceContent}
                  onChange={(event) => handleChoiceChange(index, event)}
                />
              </div>
              <Link
                to={`/admindashboard/questions/deletechoice/${choiceData.id}`}
              >
                <img src={del} className="delete" />
              </Link>
            </div>
          ))}
          <button className="button" type="submit">
            Save
          </button>
        </form>
    </>
  );
}

export default UpdateChoice;
