import { useState, useEffect } from "react";
import { API_BASE_URL, put, get } from "../../service/APIService";
import { useParams, useNavigate } from "react-router-dom";

function UpdateQuestion() {
  const params = useParams();
  const [formData, setFormData] = useState({
    id: `${params.id}`,
    questionContent: "",
    mark: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseData = await get(
        `${API_BASE_URL}/api/Question/GetQuestion?id=${params.id}`
      );
      setFormData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await put(
        `${API_BASE_URL}/api/Question/UpdateQuestion/${params.id}`,
        formData
      );
      navigate(`/questions/${params.id}`);
      console.log("put request successful:", response);
    } catch (error) {
      console.error("Error making put request:", error);
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
      <h1 className="form-header">Update Question</h1>
      <div className="form">
        <form onSubmit={handleSubmit} className="form">
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
            type="number"
              className="form-input"
              name="description"
              value={formData.description}
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

export default UpdateQuestion;
