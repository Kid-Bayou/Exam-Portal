import { useState } from "react";
import { API_BASE_URL, post } from "../../../service/APIService";
import { useNavigate } from "react-router-dom";

import "../../../styles/Admin.css";

function CreateChoice(props) {
  const [formData, setFormData] = useState({
    questionID: `${props.qId}`,
    choiceContent: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await post(
        `${API_BASE_URL}/api/Choice/CreateChoice`,
        formData
      );
      window.location.reload();
      console.log("post request successful:", response);
    } catch (error) {
      console.log(props.id);
      console.error("Error making post request:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-box">
          <p className="form-label"> Choice Content:</p>
          <input
            type="text"
            className="form-input"
            name="choiceContent"
            value={formData.choiceContent}
            onChange={handleChange}
          />
        </label>
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default CreateChoice;
