import { useState } from "react";
import { API_BASE_URL, post } from "../../../service/APIService";
import { useNavigate, useParams } from "react-router-dom";

import "../../../styles/Admin.css";

function CreateQuestion() {
  const params = useParams();
  const [formData, setFormData] = useState({
    questionContent: "",
    mark: "",
    moduleID: `${params.id}`,
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await post(
        `${API_BASE_URL}/api/Question/CreateQuestion`,
        formData
      );
      navigate(`/admindashboard/questions/${params.id}`);
      console.log("post request successful:", response);
    } catch (error) {
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
      <div className="create-question">
        <h1 className="form-header">Create Question</h1>
        <form onSubmit={handleSubmit} className="create-question-form">
          <label className="form-box">
            <p className="form-label">Question Content:</p>
            <textarea
              className="form-input"
              name="questionContent"
              value={formData.questionContent}
              onChange={handleChange}
            />
          </label>
          <label className="form-box">
            <p className="form-label">Mark:</p>
            <input
              className="form-input"
              type="number"
              name="mark"
              value={formData.mark}
              onChange={handleChange}
            />
          </label>
          <button className="button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateQuestion;
