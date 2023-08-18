import { useState } from "react";
import { API_BASE_URL, post } from "../../../service/APIService";
import { useNavigate } from "react-router-dom";

import "../Admin.css"


function CreateCourse() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await post(
        `${API_BASE_URL}/api/Course/CreateCourse`,
        formData
      );
      navigate("/admindashboard/courses");
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
      <h1 className="form-header">Create Course</h1>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-box">
          <p className="form-label"> Course Title:</p>
          <input
          className="form-input"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label className="form-box">
          <p className="form-label"> Description:</p>
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
    </>
  );
}

export default CreateCourse;
