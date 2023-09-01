import { useState, useEffect } from "react";
import { API_BASE_URL, put, get } from "../../../service/APIService";
import { useParams, useNavigate } from "react-router-dom";

import "../../../styles/Admin.css";

function UpdateCourse() {
  const params = useParams();
  const [formData, setFormData] = useState({
    id: `${params.id}`,
    title: "",
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseData = await get(
        `${API_BASE_URL}/api/Course/GetCourse?id=${params.id}`
      );
      setFormData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("i am working", formData)
      const response = await put(
        `${API_BASE_URL}/api/Course/UpdateCourse/${params.id}`,
        formData
      );
      navigate(`/admindashboard/courses/${params.id}`);
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
      <h1 className="form-header">Update Course</h1>
      <div className="form">
        <form onSubmit={handleSubmit} className="form">
          <label className="form-box">
            <p className="form-label">Course Title:</p>
            <input
              className="form-input"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>
          <label className="form-box">
            <p className="form-label">Description:</p>

            <textarea
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

export default UpdateCourse;
