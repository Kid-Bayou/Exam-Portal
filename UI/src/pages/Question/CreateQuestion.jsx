import { useState } from "react";
import { post } from "../../service/APIService";
import { useNavigate, useParams } from "react-router-dom";

function CreateQuestion() {
  const params = useParams();
  const [formData, setFormData] = useState({
    id: "",
    questionContent: "",
    mark: "",
    moduleID: `${params.id}`,
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await post(
        `https://localhost:7182/api/Question/CreateQuestion?mId=${params.id}`,
        formData
      );
      navigate(`/questions/${params.id}`);
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
        <h1 className="create-question-header">Create Question</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Question Content:
            <textarea
              name="questionContent"
              value={formData.questionContent}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />
          <label>
            Mark:
            <input
              type="number"
              name="mark"
              value={formData.mark}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />
          <button className="button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateQuestion;
